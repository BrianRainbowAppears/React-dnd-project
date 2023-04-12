import './App.css';
import React from 'react'
import DraggableIcons from './components/draggableIcons';
import { usePreview } from 'react-dnd-preview'
// Flipper用于优化拖拽动画
import Flipper from "./components/Flipper/Flipper.tsx";

function App() {
  // 图标数据
  const [icons, setIcons] = React.useState([
        {
          icon: require('./assets/work/send@3x.png'),
          text: `发文管理`,
          path: 'sendManage',
        },
        {
          icon: require('./assets/work/receive@3x.png'),
          text: `收文管理`,
          path: 'receiveManage',
        },
        {
          icon: require('./assets/work/sign@3x.png'),
          text: `签报管理`,
          path: 'signManage',
        },
        {
          icon: require('./assets/work/supervise@3x.png'),
          text: `督办管理`,
          path: 'superviseManage',
        },
        {
          icon: require('./assets/work/underSupervision@3x.png'),
          text: `督办下发`,
          path: 'underSupervision',
        },
        {
          icon: require('./assets/work/doc@3x.png'),
          text: `文档管理`,
          path: 'docManage',
        },
  ])

  // preview用于解决移动端拖拽看不到被拖拽的图标的问题
  const MyPreview = () => {
    const preview = usePreview()
    if (!preview.display) {
      return null
    }
    const {itemType, item, style} = preview
    let imgUrl
    icons.forEach((each) => {
      if (each.path === item.pathName) {
        imgUrl = each.icon
      }
    })
    return (<div>
      <img src={imgUrl} alt="" height='45' style={style}/>
    </div>)
  }

  // 移动图标方法
  const moveIcon = (dragIndex, hoverIndex) => {
    const dragIcon = icons[dragIndex]
    let copyIcons = [...icons]
    // 交换位置
    copyIcons.splice(dragIndex, 1)
    copyIcons.splice(hoverIndex, 0, dragIcon)
    setIcons(copyIcons)
  }

  return (
    <Flipper flipKey={icons}>
      <div className="App">
        {icons.map((eachIcon, index) => {
          return <DraggableIcons key={eachIcon.path} index={index} imgUrl={eachIcon.icon} pathName={eachIcon.path} moveIcon={moveIcon}></DraggableIcons>
        })}
        <MyPreview />
      </div>
    </Flipper>
  );
}

export default App;
