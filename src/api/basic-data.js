import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/basedatas',
    method: 'get',
	  params: query
	  
  })
}
//获取树
export function getTreeDatas(query) {
  return request({
    url: '/v1/basedatas/nodes',
    method: 'get'
	  
  })
}
//根据pid获取
export function getIdlist(id) {
  return request({
    url: '/v1/basedatas/'+id,
    method: 'get'
  })
}

//编辑
export function updateData(data) {
  return request({
    url: '/v1/basedatas',
    method: 'put',
    data
  })
}
//创建
export function createBasicdata(data) {
  return request({
    url: '/v1/basedatas',
    method: 'post',
    data
  })
}

//删除
export function deleteBasidata(id) {
  return request({
    url: '/basedatas/'+id,
    method: 'delete'
  })
}




