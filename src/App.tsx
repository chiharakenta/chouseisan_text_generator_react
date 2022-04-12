import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import { State } from './types/State';
import { Schedule } from './types/Schedule';
import { Time } from './types/Time';

class App extends Component {
  state: State = {
    schedules: null,
  };

  componentDidMount() {
    const schedules = [
      {
        year: 2022,
        month: 4,
        date: 11,
        day: '月',
        times: [
          {
            time: 0,
            active: false,
          },
          {
            time: 1,
            active: false,
          },
          {
            time: 2,
            active: false,
          },
          {
            time: 3,
            active: false,
          },
          {
            time: 4,
            active: false,
          },
          {
            time: 5,
            active: false,
          },
          {
            time: 6,
            active: false,
          },
          {
            time: 7,
            active: false,
          },
          {
            time: 8,
            active: false,
          },
          {
            time: 9,
            active: false,
          },
          {
            time: 10,
            active: false,
          },
          {
            time: 11,
            active: false,
          },
          {
            time: 12,
            active: false,
          },
          {
            time: 13,
            active: false,
          },
          {
            time: 14,
            active: false,
          },
          {
            time: 15,
            active: false,
          },
          {
            time: 16,
            active: false,
          },
          {
            time: 17,
            active: false,
          },
          {
            time: 18,
            active: false,
          },
          {
            time: 19,
            active: false,
          },
          {
            time: 20,
            active: false,
          },
          {
            time: 21,
            active: false,
          },
          {
            time: 22,
            active: false,
          },
          {
            time: 23,
            active: false,
          },
        ],
      },
    ];
    this.setState({
      schedules: schedules,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <div className="d-flex">
          {this.state.schedules?.map((schedule: Schedule) => {
            return (
              <div className="schedule d-flex flex-column">
                <h5 className="date-text">
                  {schedule.month}/{schedule.date}({schedule.day})
                </h5>
                {schedule.times?.map((time: Time) => (
                  <Button
                    className="mx-1 mb-1"
                    variant="outline-primary"
                    size="sm"
                    data-year={schedule.year}
                    data-month={schedule.month}
                    data-date={schedule.date}
                    data-day={schedule.day}
                  >
                    {time.time}:00
                  </Button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
