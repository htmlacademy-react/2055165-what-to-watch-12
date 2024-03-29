import './block-UI.css';

export default function BlockUI(): JSX.Element {

  return (
    <div className="block-ui-container" data-testid='block-ui-container'>
      <div className="block-ui-overlay">
        <div className="spinner-container-blockUI">
          <div className="loading-spinner" data-testid='loading-spinner'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}


