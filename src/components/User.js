import React, {useContext, useEffect} from 'react'
import {Context} from '../context'
import {ajax} from '../ajax'

function User() {
  // user 组件通过 useContext 获取到 Context 也就是读写 api
  const { state, dispatch } = useContext(Context);
  // 每次 user 组件刷新 都要setUser，每次都要请求 ajax
  // 通过 useEffect 设置就地磁进来刷新请求 ajax
  useEffect(() => {
    // user 数据默认是空，谁来设置他的数据更新呢 这里通过一个假的 ajax 来获取数据
    // 通过 ajax 返回获取到 user
    ajax("/user").then((user) => {
      // 通过 dispatch 来设置 user
      dispatch({ type: "setUser", user: user });
    });
  }, []);
  return (
    <div>
      <h1>个人信息</h1>
      <div>name: {state.user ? state.user.name : ""}</div>
    </div>
  );
}
export {User}