import { Component } from 'react';
import { Button } from 'react-bootstrap';

class CopyScheduleButton extends Component {
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

  render() {
    return (
      <div>
        <Button
          variant="primary"
          id="copy"
          onClick={this.copyScheduleText.bind(this)}
        >
          コピーして調整さんに移動
        </Button>
      </div>
    );
  }
}

export default CopyScheduleButton;
