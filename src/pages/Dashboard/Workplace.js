// pureComponent 为了避免render函数重复执行
import React, { PureComponent } from "react";
import moment from "moment";
// dva集成了react-redux的connect
import { connect } from "dva";
// 引入 link 跳转
import Link from "umi/link";

import { Row, Col, Card, List, Avatar } from "antd";
import { Radar } from "@/components/Charts";
import EditableLinkGroup from "@/components/EditableLinkGroup";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
// 引入
import styles from "./Workplace.less";

const links = [
  {title: "操作一", href:""},
  {title: "操作二",href: ""},
  {title: "操作三",href: ""},
];
//loading 获取异步action的请求是否完成的状态 ，此处先从store中获取 1111111111111111111
@connect(({ user, project, activities, chart, loading }) => ({
  currentUser: user.currentUser, //当前用户
  project,//当前项目
  activities,//活动
  chart, //图表数据
  currentUserLoading: loading.effects["user/fetchCurrent"], //拉取当前用户 的 状态  用来组件loading
  projectLoading: loading.effects["project/fetchNotice"],//拉取进行中的项目
  activitiesLoading: loading.effects["activities/fetchList"] //拉取动态,
}))

class Workplace extends PureComponent {
  componentDidMount() { //一系列请求数据
    const { dispatch } = this.props; //2222222222222222222
    dispatch({type: "user/fetchCurrent"});
    dispatch({type: "project/fetchNotice"});
    dispatch({type: "activities/fetchList"});
    dispatch({type: "chart/fetch"});
    console.log(this.props)
  }

  componentWillUnmount() { // 页面卸载时 清空chart数据
    const { dispatch } = this.props;
    dispatch({type: "chart/clear"});
  }
  //渲染动态
  renderActivities() {
    const { activities: { list } } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar}/>}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      project: { notice },//相当于取出notice赋值  const notice  = project.notice
      projectLoading,
      activitiesLoading,
      chart: { radarData }
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar}/>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <a href="http://dev.qingxiangchuxing.com/images/upload/private/signNatrue/2019/20/70/96/cz123.pdf">下载吧</a>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo}/>
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ""}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {
              }} links={links} linkElement={Link}/>
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                {/*雷达图*/}
                <Radar hasLegend height={343} data={radarData}/>
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {notice.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small"/>
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
