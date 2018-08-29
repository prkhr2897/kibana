import ReactDOM from 'react-dom';
import React from 'react';
import { EuiIcon } from '@elastic/eui';
import { Popover } from '../../components/popover';
import { Error } from '../../components/error';

export const error = () => ({
  name: 'error',
  displayName: 'Error Information',
  help: 'Render error data in a way that is helpful to users',
  reuseDomNode: true,
  render(domNode, config, handlers) {
    const draw = () => {
      const buttonSize = Math.min(domNode.clientHeight, domNode.clientWidth);
      const button = handleClick => (
        <EuiIcon
          className="canvasRenderError__icon"
          onClick={handleClick}
          style={{
            height: buttonSize,
            width: buttonSize,
          }}
          type="alert"
        />
      );

      ReactDOM.render(
        <div className="canvasRenderError">
          <Popover button={button}>{() => <Error payload={config} />}</Popover>
        </div>,

        domNode,
        () => handlers.done()
      );
    };

    draw();

    handlers.onResize(draw);

    handlers.onDestroy(() => ReactDOM.unmountComponentAtNode(domNode));
  },
});
