import { Container, Button } from 'react-bootstrap';
import CopyScheduleButton from './CopyScheduleButton';

const ScheduleText = (props: any) => {
  return (
    <div>
      <Container>
        <h2>調整さん用テキスト</h2>
        <textarea id="scheduleText" cols={30} rows={10}></textarea>
        <div className="mb-1">
          <Button variant="outline-secondary" onClick={props.openModal}>
            時間を細かく指定
          </Button>
        </div>
        <CopyScheduleButton />
      </Container>
    </div>
  );
};

export default ScheduleText;
