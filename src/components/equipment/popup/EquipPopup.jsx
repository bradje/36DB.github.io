import React from 'react';

import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { injectIntl, FormattedMessage } from 'react-intl';


import style from './style';

// const categoryFormatDict = {
//   doll: 'Doll Equip',
// };

const StatNameFormatDict = {
  pow: 'Damage',
  hit: 'Accuracy',
  rate: 'Rate of Fire',
  dodge: 'Evasion',
  speed: 'Move Speed',
  criticalHarmRate: 'Crit. Damage',
  criticalPercent: 'Crit. Rate',
  nightview: 'NightView',
  bullet: 'Bullet Amount',
  armorPiercing: 'Armor Pen.',
};

class EquipPopup extends React.Component {
  constructor(props) {
    super(props);

    const { info } = props;

    this.state = {
      level: info.maxLevel,
    };
    this.handleLvChange = this.handleLvChange.bind(this);
  }
  buildTime2Str(time) {
    const hour = Number.parseInt(time / 3600, 10);
    const min = Number.parseInt((time - (hour * 3600)) / 60, 10);
    const sec = Number.parseInt(time % 60, 10);

    return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  handleLvChange(event) {
    let newLevel = (event.target.value !== '') ? Number(event.target.value) : 1;

    newLevel = (newLevel > this.props.info.maxLevel) ? this.props.info.maxLevel : newLevel;
    newLevel = (newLevel < 0) ? 0 : newLevel;

    this.props.info.level = newLevel;
    this.setState({ level: newLevel });
  }

  render() {
    const { classes, intl, info } = this.props;
    const {
      name,
      sprite,
      color,
      category,
      type,
      stats,
      maxLevel,
      buildTime,
      introduction,
    } = info;

    return (
      <div>
        {(info) ? (
          <div className={classes.popup}>
            <img style={{ width: '100%' }} alt={name} src={sprite} />
            <h2 style={{ textAlign: 'center', color }}>{name}</h2>
            <h3 style={{ textAlign: 'center', color: 'white' }}>{category}</h3>
            <h3 style={{ textAlign: 'center', color: 'white' }}>{type}</h3>
            <div style={{ textAlign: 'center', color: 'white' }}>{introduction}</div>
            <br />
            <FormControl className={classes.levelForm}>
              <InputLabel htmlFor="level" style={{ color: 'gray' }}><FormattedMessage id="Level" /></InputLabel>
              <Select
                native
                className={classes.levelSelect}
                value={this.state.level}
                onChange={this.handleLvChange}
                inputProps={{
                  id: 'level',
                  name: 'level',
                }}
              >
                {maxLevel === 0
                  ? <option className={classes.statOption} value={0}>-</option>
                  : Array(maxLevel).fill().map((_, i) => (
                    <option className={classes.statOption} value={i + 1}>{i + 1}</option>
                    ))
                }
              </Select>
            </FormControl>
            <table className={classes.statTable}>
              <tbody>
                {Object.keys(stats).map(key => (
                  <tr>
                    <td className={classes.statName}>
                      {
                        StatNameFormatDict[key]
                        ? intl.formatMessage({ id: StatNameFormatDict[key] })
                        : key
                      }
                    </td>
                    <td className={classes.statNum}>
                      {stats[key].min === stats[key].max
                        ? `${stats[key].min}`
                        : `${stats[key].min} ~ ${stats[key].max}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className={classes.craftTime}>
              {
                buildTime === 0 ?
                  (<span style={{ color: 'red' }}><FormattedMessage id="Non-craftable" /></span>) :
                  `${intl.formatMessage({ id: 'Production Time' })} - ${this.buildTime2Str(buildTime)}`
              }
            </h3>
          </div>
        ) : <div />}
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(EquipPopup));
