```javascript
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  var canMove = !removeOnly;

  if (process.env.NODE_ENV !== "production") {
    checkDuplicateKeys(newCh);
  }

  /**
     * 
     * 整个diff过程是一个不断while循环的过程 在循环过程中通过不同的case进行判断 
     * 通过不同情况的判断选择出最优的节点移动方式
     * 每经过一个while循环 old/new start idx++，相反的 old/new end idx --
     * 当oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx的情况下会不断的进行while循环进行diff操作节点位置操作
     * 在整个diff过程中 是同级比较的 没有跨层级进行diff 比较的vnode的父节点是同一个。
     
          +-->                                       <--+

      old start idx                                old end idx
          +----+         +----+         +----+       +----+
          |    |         |    |         |    |       |    |
          |    |         |    |         |    |       |    |
          +----+         +----+         +----+       +----+


          +----+         +----+         +----+       +----+       +----+
          |    |         |    |         |    |       |    |       |    |
          |    |         |    |         |    |       |    |       |    |
          +----+         +----+         +----+       +----+       +----+
      new start idx                                             new end idx

           +-->                                                    <--+

     */
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      // case 1 ： 旧的列表中 oldstartvnode不存在 直接 ++ 后移一位
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      // case 2 : 旧的列表中 oldendvnode不存在 直接 -- 前移一位
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // case 3 ：判断新旧start vnode是不是相同的 如果是相同的 直接对这两个相同的vnode进行陈层的patchVnode操作
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // case 4 ： 如果 旧end 和 新end相同 ，对这两个节点进行深度的patchVnode操作
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // case 5 :如果旧start和新end是相同的节点 第一步对这两个节点进行深层的patchvnode， 把子节点都patch完毕，第二步把旧start插入到旧end后边 也就是和新vnode保持一致
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // case 6 ：如果旧end和新start相同 第一步：深层patch 第二步：把旧end添加到旧start前边
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // case 7 ： 在不满足上述情况下 又分为2种子情况
      if (isUndef(oldKeyToIdx)) {
        // 在oldkeytoidx不存在的情况下去构建一个哈希表
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = isDef(newStartVnode.key) // 判断当前新start的key存不存在
        ? oldKeyToIdx[newStartVnode.key] //  如果存在 就去旧哈希表中寻找
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx); // 否则通过samenode去查找
      if (isUndef(idxInOld)) {
        // 在通过寻找过后 没有在旧的vnode列表中查找到新的vnode节点 迫不得已 去创建dom元素并插入到到dom树中
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        vnodeToMove = oldCh[idxInOld]; // 拿到需要移动的vnode节点
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 判断是不是相同的vnode节点 （不存在同为undefined的情况 因为已经在find的过程中对同为undefined的情况进行了判断 这里针对两个vnode虽然key相同 但实际上不是严格相同的vnode进行筛选）
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          oldCh[idxInOld] = undefined;
          // 在每次插入的过程中都是在通过旧vnode的元素进行定位和插入 以保证最小改动 这里直接把当前找到的vnode插入到旧start（其实不一定是start 因为idx一直在变）前边
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          //虽然通过key找到了旧vnode 数组中对应的当前元素 但是这两个vnode并不是严格相等的 所以直接按照未找到当前节点的策略进行 去创建一个新的节点 无法通过节点的移动去提高性能
          // same key but different element. treat as new element
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      newStartVnode = newCh[++newStartIdx]; //当前新节点已经插入了 ++
    }
  }
  if (oldStartIdx > oldEndIdx) {
    // 这个case下 代表 旧节点比新节点少 就需要添加新节点进去
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm; // 确定插入位置
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    ); // 遍历插入
  } else if (newStartIdx > newEndIdx) {
    // 代表新节点比旧节点少 去删除就节点中不想要的节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```
