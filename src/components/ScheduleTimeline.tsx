import { Modal, Button } from 'react-bootstrap';
import { Schedule } from '../types/Schedule';
import { Time } from '../types/Time';

const ScheduleTimeline = (props: any) => {
  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>時間を選択</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex overflow-scroll">
          {props.schedules?.map((schedule: Schedule) => {
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
                    onClick={props.selectSchedule}
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
        <Button variant="primary" onClick={props.closeModal}>
          保存
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleTimeline;
