import dolls from '../repositories/data/doll';
// import dolls from '../repositories/DollRepository';
import { propertyFilter, nameFilter } from '../repositories/data/filter';
import { ADD_FILTER, DELETE_FILTER } from '../actions/dolldict';

function apply(filters) {
  if (filters.length === 0) {
    return dolls;
  }

  const nameFilters = filters.filter(filter => filter.type === 'name');
  const rankFilters = filters.filter(filter => filter.type === 'rank');
  const typeFilters = filters.filter(filter => filter.type === 'type');
  return dolls.filter((doll) => {
    const nameFilterResult = nameFilters.every(filter => filter.predicate(doll));
    let rankFilterResult = false;
    if (rankFilters.length === 0) rankFilterResult = true;
    else {
      let flag = false;
      rankFilters.map((filter) => {
        const result = filter.predicate(doll);
        if (result) flag = true;
        return result;
      });
      if (flag === true) rankFilterResult = true;
    }

    let typeFilterResult = false;
    if (typeFilters.length === 0) typeFilterResult = true;
    else {
      let flag = false;
      typeFilters.map((filter) => {
        const result = filter.predicate(doll);
        if (result) flag = true;
        return result;
      });
      if (flag === true) typeFilterResult = true;
    }

    return nameFilterResult && rankFilterResult && typeFilterResult;
  });
}

function addFilter(filters, data) {
  if (data.type === 'name') {
    const ids = [];
    Array.from(nameFilter.keys()).forEach((key) => {
      if (String(key).indexOf(data.value) >= 0) {
        ids.push(nameFilter.get(String(key)));
      }
    });
    filters.push({
      type: 'name',
      query: data.value,
      predicate: doll => ids.indexOf(doll.id) >= 0,
    });
  } else {
    filters.push({
      type: data.type,
      query: data.value,
      predicate: propertyFilter.get(data.value),
    });
  }

  return {
    list: apply(filters),
    filters,
  };
}

function deleteFilter(filters, value) {
  filters.splice(filters.indexOf(value), 1);

  return {
    list: apply(filters),
    filters,
  };
}

function initFilter() {
  return {
    list: dolls,
    filters: [],
  };
}

const reducer = (state = initFilter(), action) => {
  switch (action.type) {
    case ADD_FILTER:
      return addFilter([...state.filters], action.value);
    case DELETE_FILTER:
      return deleteFilter([...state.filters], action.value);
    default:
      return state;
  }
};

export default reducer;
