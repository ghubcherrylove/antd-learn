import React from 'react';
import {FormattedMessage} from 'umi/locale';

class English extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div><FormattedMessage id="helloworld" /></div>
    );
  }
}

export default English;