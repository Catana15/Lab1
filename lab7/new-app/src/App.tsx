import * as React from 'react';
import { Link} from 'react-router-dom';
import Main from './Main';
import { SwapOutlined, PlayCircleOutlined, DownSquareOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import './App.css'
import './index.css'

export default function App() {

  return (
    <>  
      <div className='Main'>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<SwapOutlined />}>
            <Link to='/'>Nature</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlayCircleOutlined />}>
            <Link to='/topics'>Water</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DownSquareOutlined />}>
            <Link to='/settings'>Sky</Link>
          </Menu.Item>
        </Menu>
        <hr />
        
        <Main />       
      </div>   
    </>)
}
