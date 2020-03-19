import React from 'react';
import en_US from 'antd/lib/locale-provider/en_US';
import { DatePicker, LocaleProvider } from 'antd';
import {FormattedMessage, IntlProvider, addLocaleData} from 'react-intl';
import zhData from 'react-intl/locale-data/zh';

const message = {
  'helloworld': '你好'
}
addLocaleData(zhData);

class MyLearn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <IntlProvider locale="zh" message={message}>
          <LocaleProvider locale={en_US}>
            <DatePicker />
            <FormattedMessage id="helloworld" />
          </LocaleProvider>
        </IntlProvider>
      </div>
    );
  }
}

export default MyLearn;