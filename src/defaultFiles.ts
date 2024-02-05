export type DefaultFile = {
  path: string,
  contents: string
}

export default [
  {
    path: 'app/tests/App.test.js',
    contents: `import React from 'react';
    import { shallow } from 'enzyme';
    import App from './App';
    
    describe('App Component', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<App />);
      });
    
      it('renders', () => {
        expect(wrapper).not.toBeNull();
      });
    });`
  },
  {
    path: 'app/src/index.js',
    contents: `import React from "react";
    import ReactDOM from "react-dom";
    import "./index.css";
    import App from "./components/App/App.jsx";
    
    ReactDOM.render(<App />, document.getElementById("root"));`
  },
  {
    path: 'app/src/index.css',
    contents: `body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
    }`
  },
  {
    path: 'app/src/helpers/localStorage.js',
    contents: `export const getData = (key) => {
      if (!localStorage) return;
    
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (err) {
        console.error(\`Error getting item \${key} from localStorage\`, err);
      }
    };
    
    export const storeData = (key, item) => {
      if (!localStorage) return;
    
      try {
        return localStorage.setItem(key, JSON.stringify(item));
      } catch (err) {
        console.error(\`Error storing item \${key} to localStorage\`, err);
      }
    };`
  },
  {
    path: 'app/src/components/App/App.jsx',
    contents: `import React, { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    import 'materialize-css/dist/css/materialize.min.css';
    import './App.css';
    import BmiForm from '../BmiForm/BmiForm';
    import Info from '../Info/Info';
    import Bar from '../Bar/Bar';
    import { getData, storeData } from '../../helpers/localStorage';
    
    const App = () => {
      const initialState = () => getData('data') || [];
      const [state, setState] = useState(initialState);
      const [data, setData] = useState({});
    
      useEffect(() => {
        storeData('data', state);
        const date = state.map(obj => obj.date);
        const bmi = state.map(obj => obj.bmi);
        let newData = { date, bmi };
        setData(newData);
      }, [state]);
    
      const handleChange = val => {
        let heightInM = val.height / 100;
        val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
        val.id = uuidv4();
        let newVal = [...state, val];
        let len = newVal.length;
        if (len > 7) newVal = newVal.slice(1, len);
        setState(newVal);
      };
    
      const handleDelete = id => {
        storeData('lastState', state);
        let newState = state.filter(i => {
          return i.id !== id;
        });
        setState(newState);
      };
    
      const handleUndo = () => {
        setState(getData('lastState'));
      };
    
      return (
        <div className='container'>
          <div className='row center'>
            <h1 className='white-text'> BMI Tracker </h1>
          </div>
          <div className='row'>
            <div className='col m12 s12'>
              <BmiForm change={handleChange} />
              <Bar labelData={data.date} bmiData={data.bmi} />
              <div>
                <div className='row center'>
                  <h4 className='white-text'>7 Day Data</h4>
                </div>
                <div className='data-container row'>
                  {state.length > 0 ? (
                    <>
                      {state.map(info => (
                        <Info
                          key={info.id}
                          id={info.id}
                          weight={info.weight}
                          height={info.height}
                          date={info.date}
                          bmi={info.bmi}
                          deleteCard={handleDelete}
                        />
                      ))}
                    </>
                  ) : (
                      <div className='center white-text'>No log found</div>
                    )}
                </div>
              </div>
              {getData('lastState') !== null ? (
                <div className='center'>
                  <button className='calculate-btn' onClick={handleUndo}>
                    Undo
                  </button>
                </div>
              ) : (
                  ''
                )}
            </div>
          </div>
        </div>
      );
    };
    
    export default App;`
  },
  {
    path: 'app/src/components/App/App.css',
    contents: `body {
      background-color: #172b4d;
    }
    
    input {
      background-color: #fff !important;
      border-radius: 44px !important;
      width: 90% !important;
      padding: 0px 15px !important;
    }
    
    input:focus {
      border-bottom: none !important;
      box-shadow: none !important;
    }
    
    label {
      display: block;
      color: #fff !important;
      font-size: 1rem !important;
    }
    
    .calculate-btn {
      background-color: #3f51b5;
      padding: 15px 50px;
      color: white;
      font-size: 16px;
      border-radius: 44px;
      cursor: pointer;
      border: 1px solid #3f51b5;
      margin-bottom: 40px;
      transform: translate3d(0, 0, 0);
      transition: all 0.2s ease;
    }
    
    .calculate-btn:hover {
      background-color: #fff;
      transform: translate(0px, -2px);
      color: #5364c3;
      box-shadow: 0px 15px 30px -12px rgba(255, 255, 255, 0.2);
    }
    
    .calculate-btn:focus {
      background-color: #32408f;
    }
    
    .calculate-btn:focus:hover {
      color: white;
    }
    
    .calculate-btn:disabled {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: default;
    }
    
    .calculate-btn:disabled:hover {
      box-shadow: none;
      transform: translate(0, 0);
    }
    
    .data-container {
      background-color: #1f3a67;
      border-radius: 11px;
      margin-top: 40px;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    
    .card {
      background-color: #274881 !important;
      color: white;
    }
    
    .card-title {
      font-weight: 500 !important;
      text-align: center;
    }
    
    .card-data {
      display: flex;
      justify-content: space-around;
    }
    
    .delete-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 50%;
      font-weight: 700;
      padding: 5px 9px;
      cursor: pointer;
      position: absolute;
      top: -12px;
      right: -12px;
    }
    
    .delete-btn:focus {
      background-color: #e74c3c;
    }`
  },
  {
    path: 'app/src/components/Bar/Bar.jsx',
    contents: `import React from 'react';
    import { Line } from 'react-chartjs-2';
    import PropTypes from 'prop-types';
    
    const Bar = ({ labelData, bmiData }) => {
      const data = canvas => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(63, 81, 181, 700);
        gradient.addColorStop(0, '#929dd9');
        gradient.addColorStop(1, '#172b4d');
    
        return {
          labels: labelData,
          datasets: [
            {
              label: 'BMI',
              data: bmiData,
              backgroundColor: gradient,
              borderColor: '#3F51B5',
              pointRadius: 6,
              pointHoverRadius: 8,
              pointHoverBorderColor: 'white',
              pointHoverBorderWidth: 2
            }
          ]
        };
      };
    
      const options = {
        responsive: true,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date',
                fontSize: 18,
                fontColor: 'white'
              },
              gridLines: {
                display: false,
                color: 'white'
              },
              ticks: {
                fontColor: 'white',
                fontSize: 16
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'BMI',
                fontSize: 18,
                fontColor: 'white'
              },
              gridLines: {
                display: false,
                color: 'white'
              },
              ticks: {
                fontColor: 'white',
                fontSize: 16,
                beginAtZero: true
              }
            }
          ]
        },
        tooltips: {
          titleFontSize: 13,
          bodyFontSize: 13
        }
      };
    
      return (
        <>
          <Line data={data} options={options} />
        </>
      );
    };
    
    Bar.propTypes = {
      labelData: PropTypes.array,
      bmiData: PropTypes.array
    };
    
    export default Bar;`
  },
  {
    path: 'app/src/components/BmiForm/BmiForm.jsx',
    contents: `import React, { useState } from 'react';
    import PropTypes from 'prop-types';
    import '../App/App.css';
    
    const initialValues = {
      weight: '',
      height: '',
      date: ''
    }
    
    const BmiForm = ({ change }) => {
      const [state, setState] = useState(initialValues);
    
      const handleChange = e => {
        let { value, name } = e.target;
        if (value > 999) {
          value = 999;
        }
        const date = new Date().toLocaleString().split(',')[0];
        setState({
          ...state,
          [name]: value,
          date
        });
      };
    
      const handleSubmit = () => {
        change(state);
        setState(initialValues);
      };
    
      return (
        <>
          <div className="row">
            <div className="col m6 s12">
              <label htmlFor="weight">Weight (in kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="1"
                max="999"
                placeholder="50"
                value={state.weight}
                onChange={handleChange}
              />
            </div>
    
            <div className="col m6 s12">
              <label htmlFor="height">Height (in cm)</label>
              <input
                id="height"
                name="height"
                type="number"
                min="1"
                max="999"
                placeholder="176"
                value={state.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="center">
            <button
              id="bmi-btn"
              className="calculate-btn"
              type="button"
              disabled={state.weight === '' || state.height === ''}
              onClick={handleSubmit}
            >
              Calculate BMI
            </button>
          </div>
        </>
      );
    };
    
    BmiForm.propTypes = {
      change: PropTypes.func.isRequired
    };
    
    export default BmiForm;`
  },
  {
    path: 'app/src/components/Info/Info.jsx',
    contents: `import React from 'react';
    import PropTypes from 'prop-types';
    
    const Info = ({ weight, height, id, date, bmi, deleteCard }) => {
      const handleDelete = () => {
        deleteCard(id);
      };
    
      return (
        <div className="col m6 s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title" data-test="bmi">
                BMI: {bmi}
              </span>
              <div className="card-data">
                <span data-test="weight">Weight: {weight} kg</span>
                <span data-test="height">Height: {height} cm</span>
                <span data-test="date">Date: {date}</span>
              </div>
    
              <button className="delete-btn" onClick={handleDelete}>
                X
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    Info.propTypes = {
      weight: PropTypes.string,
      height: PropTypes.string,
      id: PropTypes.string,
      date: PropTypes.string,
      bmi: PropTypes.string,
      deleteCard: PropTypes.func
    };
    
    export default Info;`
  },
  {
    path: 'app/src/components/Info/InfoCard/InfoCard.jsx',
    contents: `import React from 'react';
    import PropTypes from 'prop-types';
    
    const InfoCard = ({weight, height, bmi }) => {
    
      return (
        <div className="infocard">
          <div className="content">
            Weight: {weight}, Height: {height}, BMI: {bmi}.
          </div>
        </div>
      );
    };
    
    Info.propTypes = {
      weight: PropTypes.string,
      height: PropTypes.string,
      bmi: PropTypes.string,
    };
    
    export default Info;`
  },
  {
    path: 'app/src/components/Info/InfoCard/InfoCard.css',
    contents: `.infocard {
      background: red;
      color: green;
    }`
  },
] as DefaultFile[];
