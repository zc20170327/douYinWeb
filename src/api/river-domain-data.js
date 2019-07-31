import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/GET/basins',
    method: 'get',
	  params: query
  })
}
//获取树
export function getTreeDatas(query) {
  return request({
    url: '/GET/basins/nodes',
    method: 'get'
	  
  })
}
//根据id获取
export function getIdlist(id) {
  return request({
    url: '/GET/basins/'+id,
    method: 'get',
    params: { id }
  })
}

//编辑
export function updateData(data) {
  return request({
    url: '/PUT/basins',
    method: 'put',
    data
  })
}
//创建
export function createdata(data) {
  return request({
    url: '/POST/basins',
    method: 'post',
    data
  })
}

//删除
export function deleteBasidata(id) {
  return request({
    url: '/DELETE/basins/'+id,
    method: 'delete'
  })
}




