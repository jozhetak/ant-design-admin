// pureComponent 为了避免render函数重复执行
import React, { PureComponent } from 'react';
import moment from 'moment';
// dva集成了react-redux的connect
import { connect } from 'dva';
// 引入link 用来跳转
import Link from 'umi/link';

import { Row, Col, Card, List, Avatar ,Input,Button,Form} from 'antd';
import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// 引入当前页面专属css
import styles from './newpage.less'
class Workplace extends PureComponent {
  render() {
  	return (
  		<PageHeaderWrapper>
				<div className={styles.pageContainer}>
          <Row gutter={20}>
						<Form layout="inline">
              <Col span={6}>
								<Form.Item label="姓名">
                  <Input placeholder="请输入查询条件"/>
								</Form.Item>
							</Col>
              <Col span={6}>
                <Form.Item label="姓名">
                  <Input placeholder="请输入查询条件"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="姓名">
                  <Input placeholder="请输入查询条件"/>
                </Form.Item>
              </Col>
              <Col span={6}><Button type="primary">查询</Button></Col>
						</Form>
          </Row>
				</div>
  		</PageHeaderWrapper>
  	)
  }
}

export default Workplace;
