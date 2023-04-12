import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react"; 
import React from 'react'
// Flipped用于优化拖拽动画
import  Flipped  from "./Flipper/Flipped.tsx";

function DraggableIcons({imgUrl, pathName, index, moveIcon}) {
  const ref = useRef(null)
  
  const [{ didDrop }, drop] = useDrop({
    accept: 'icons',
    collect: (monitor) => ({
      didDrop: !!monitor.didDrop()
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      // 拖拽图标的index
      const dragIndex = item.index;
      // 被hover图标的index
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      // debugger
      // 获取到当前被hover图标的左右坐标
      const { left, right, top, bottom } = ref.current.getBoundingClientRect()
      // 获取到一半的hover宽度
      const halfOfHoverWidth = (right - left) / 2;
      // 获取到当前鼠标的坐标
      const { x, y } = monitor.getClientOffset()
      // 鼠标移动入hover图标距离左侧边缘的距离
      const hoverClientX = x - left
      // 鼠标移动过图标一半的hover宽度时移动图标
      // if ((dragIndex < hoverIndex && left < x < right && top < y < bottom) || (dragIndex > hoverIndex && left < x < right && top < y < bottom)) {
      if ((dragIndex < hoverIndex && hoverClientX > halfOfHoverWidth) || (dragIndex > hoverIndex && hoverClientX < halfOfHoverWidth)) {
        console.log({dragIndex, hoverIndex});
        moveIcon(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    }
  })

  const [{isDragging, opacity}, drag] = useDrag(() => ({
    type: 'icons',
    item: {pathName, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : undefined,
    })
  }))

  // 当图标正在被拖拽时触发
  if (isDragging) {

  }

  drag(drop(ref))
  return (
    <Flipped innerRef={ref}>
      <img src={imgUrl} alt="" height='45' style={{padding: '15px', opacity}} />
    </Flipped>
  )
}

export default DraggableIcons
