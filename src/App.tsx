import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Modal } from 'react-bootstrap';

import { State } from './types/State';
import { Schedule } from './types/Schedule';
import { Time } from './types/Time';
class App extends Component {
  state: State = {
    schedules: [],
    show: false,
  };

  componentWillMount = () => {
    const today: Date = new Date();
    const daysToSunday: number = 7 - today.getDay();
    let schedules: Array<Schedule> = [];
    const dayString: Array<string> = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i: number = 0; i <= daysToSunday; i++) {
      const times: Array<Time> = [];
      for (let i: number = 0; i < 24; i++) {
        times.push({
          time: i,
          active: false,
          timestamp: String(today.getTime()) + String(i),
        });
      }
      schedules.push({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: dayString[today.getDay()],
        times: times,
      });
      today.setDate(today.getDate() + 1);
    }
    this.setState({
      schedules: schedules,
      show: this.state.show,
    });
  };

  componentDidMount = () => {
    this.setQuietTimeSchedule();
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.id === 'quietTime') this.setQuietTimeSchedule();
    if (event.currentTarget.id === 'farm') this.setFarmSchedule();
  };

  setQuietTimeSchedule = () => {
    const quietTimeElement: any = document.getElementById('quietTime')!;
    if (!quietTimeElement.checked) quietTimeElement.checked = true;
    const quietTimeSchedules: Array<any> = [
      {
        day: '日',
        times: [14, 15, 16, 17, 18, 19, 20],
      },
    ];
    this.setEventTimeSchedule(quietTimeSchedules);
  };

  setFarmSchedule = () => {
    const farmSchedules: Array<any> = [
      {
        day: '土',
        times: [10, 11, 12, 13, 14, 15, 16, 17],
      },
      {
        day: '日',
        times: [14, 15, 16, 17],
      },
    ];
    this.setEventTimeSchedule(farmSchedules);
  };

  setEventTimeSchedule = (eventTimeSchedules: Array<any>) => {
    this.clearSelect();
    const stateSchedules: Array<Schedule> = this.state.schedules.slice();
    let dateIndex: number;
    eventTimeSchedules.forEach((eventTimeSchedule) => {
      // searchDate
      for (let i: number = 0; i < stateSchedules.length; i++) {
        if (stateSchedules[i].day === eventTimeSchedule.day) {
          dateIndex = i;
        }
      }
      eventTimeSchedule.times.forEach((quietTimeTime: number) => {
        for (
          let i: number = 0;
          i < stateSchedules[dateIndex].times.length;
          i++
        ) {
          if (stateSchedules[dateIndex].times[i].time === quietTimeTime) {
            stateSchedules[dateIndex].times[i].active = true;
          }
        }
      });
    });
    this.setState({
      schedules: stateSchedules,
      show: this.state.show,
    });
    this.createScheduleText();
  };

  selectSchedule: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    let schedules = this.state.schedules?.slice();
    for (let i: number = 0; i < schedules?.length; i++) {
      for (let j: number = 0; j < schedules[i].times.length; j++) {
        if (
          schedules[i].times[j].timestamp ===
          event.currentTarget.dataset.timestamp
        ) {
          schedules[i].times[j].active = !schedules[i].times[j].active;
          this.setState({
            schedules: schedules,
            show: this.state.show,
          });
          this.createScheduleText();
          return;
        }
      }
    }
  };

  clearSelect = () => {
    const schedules: Array<Schedule> = this.state.schedules.slice();
    for (const i in schedules) {
      for (const j in schedules[i].times) {
        schedules[i].times[j].active = false;
      }
    }
    this.setState({
      schedules: schedules,
      show: this.state.show,
    });
  };

  createScheduleText = () => {
    let scheduleText: string = '';
    this.state.schedules.forEach((schedule: Schedule) => {
      schedule.times.forEach((time: Time) => {
        if (time.active) {
          const dateText = `${schedule.month}/${schedule.date}(${schedule.day})`;
          const timeText = `${time.time}:00~${time.time + 1}:00`;
          scheduleText = scheduleText + dateText + ' ' + timeText + '\n';
        }
      });
    });
    const scheduleTextElement: HTMLElement =
      document.getElementById('scheduleText')!;
    scheduleTextElement.textContent = scheduleText;
  };

  copyScheduleText: React.MouseEventHandler<HTMLButtonElement> = () => {
    const scheduleText: string =
      document.getElementById('scheduleText')!.textContent!;
    navigator.clipboard.writeText(scheduleText).then(() => {
      alert(
        'スケジュールをコピーしました。\n調整さんの「日にち候補」に貼り付けてください。',
      );
      window.location.href = 'https://chouseisan.com/#tab2';
    });
  };

  handleShow = () => {
    this.setState({
      schedules: this.state.schedules,
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      schedules: this.state.schedules,
      show: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Container>
            <h1>次回のイベントの候補時間</h1>
          </Container>
        </div>
        <div>
          <Container>
            <h2>イベントを選択</h2>
            <Form>
              <Form.Check
                onChange={this.handleChange.bind(this)}
                type="radio"
                name="scheduleType"
                id="quietTime"
                label="QT"
              ></Form.Check>
              <Form.Check
                onChange={this.handleChange.bind(this)}
                type="radio"
                name="scheduleType"
                id="farm"
                label="畑"
              ></Form.Check>
            </Form>
          </Container>
        </div>
        <div>
          <Container>
            <h2>調整さん用テキスト</h2>
            <textarea id="scheduleText" cols={30} rows={10}></textarea>
            <div className="mb-1">
              <Button variant="outline-secondary" onClick={this.handleShow}>
                時間を細かく指定
              </Button>
            </div>
            <div>
              <Button
                variant="primary"
                id="copy"
                onClick={this.copyScheduleText.bind(this)}
              >
                コピーして調整さんに移動
              </Button>
            </div>
          </Container>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>時間を選択</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex overflow-scroll">
              {this.state.schedules?.map((schedule: Schedule) => {
                return (
                  <div
                    className="schedule d-flex flex-column px-1 border-start border-end"
                    key={`${schedule.year}/${schedule.month}/${schedule.date}`}
                  >
                    <h5 className="date-text">
                      {schedule.month}/{schedule.date}({schedule.day})
                    </h5>
                    {schedule.times?.map((time: Time) => (
                      <Button
                        className="mx-1 mb-1"
                        variant="outline-primary"
                        size="sm"
                        active={time.active}
                        data-year={schedule.year}
                        data-month={schedule.month}
                        data-date={schedule.date}
                        data-day={schedule.day}
                        data-timestamp={time.timestamp}
                        key={time.timestamp}
                        onClick={this.selectSchedule.bind(this)}
                      >
                        {time.time}:00
                      </Button>
                    ))}
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              保存
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
