// pureComponent 为了避免render函数重复执行
import React, { PureComponent } from 'react';
import moment from 'moment';
// dva集成了react-redux的connect
import { connect } from 'dva';
// 引入link 用来跳转
import Link from 'umi/link';

import { Row, Col, Card, List, Avatar } from 'antd';
import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// 引入当前页面专属css

class Workplace extends PureComponent {
  render() {
  	return (
  		<PageHeaderWrapper>
  			<h1>麻烦</h1>	
  		</PageHeaderWrapper>
  	)
  }
}

export default Workplace;
