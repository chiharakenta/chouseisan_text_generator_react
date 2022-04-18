import { Container, Form } from 'react-bootstrap';

interface SelectEventFormProps {
  onChange: any;
}

const SelectEventForm = (props: SelectEventFormProps) => {
  return (
    <div>
      <Container>
        <h2>イベントを選択</h2>
        <Form>
          <Form.Check
            onChange={props.onChange}
            type="radio"
            name="scheduleType"
            id="quietTime"
            label="QT"
          ></Form.Check>
          <Form.Check
            onChange={props.onChange}
            type="radio"
            name="scheduleType"
            id="farm"
            label="畑"
          ></Form.Check>
        </Form>
      </Container>
    </div>
  );
};

export default SelectEventForm;
