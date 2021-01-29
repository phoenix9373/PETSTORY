import React, { useState, Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function UserFeedsTabs(props) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <Paper square>
      <Tabs
        value={value} // 왼쪽 value는 Tab과 관련된 고정값, 바꾸면 안돼 / 오른쪽 value: reactHook
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="My Story" />
        <Tab label="Collections" />
        <Tab label="Likes" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* props defined 에러 난 이유: 여기는 UI 자리인데 html태그없이 써서 + 함수컴포넌트니까 this안쓰고 인자로 props */}
        {props.feeds.map((feed) => (
          <div key={feed.board_id}>{feed.board_title}</div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        내가 저장한 피드
      </TabPanel>
      <TabPanel value={value} index={2}>
        내가 좋아요한 피드
      </TabPanel>
    </Paper>
  );
}

class TabPanel extends Component {
  render() {
    return (
      <div hidden={this.props.value !== this.props.index}>
        {/* <p>{this.props.value}</p> */}
        <Box p={3}>{this.props.children}</Box>
      </div>
    );
  }
}

export default UserFeedsTabs;
