import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/basins',
    method: 'get',
	  params: query
  })
}
//获取树
export function getTreeDatas(query) {
  return request({
    url: '/basins/nodes',
    method: 'get'
  })
}
//根据id获取
export function getIdData(id) {
  return request({
    url: '/basins/'+id,
    method: 'get',
    params: { id }
  })
}

//编辑
export function updateData(data) {
  return request({
    url: '/basins',
    method: 'put',
    data
  })
}
//创建
export function createdata(data) {
  return request({
    url: '/basins',
    method: 'post',
    data
  })
}

//删除
export function deleteBasidata(id) {
  return request({
    url: '/basins/'+id,
    method: 'delete'
  })
}




