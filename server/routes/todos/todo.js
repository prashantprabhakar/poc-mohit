const express = require('express')
const router = express.Router()
const passport = require('passport')
const { handleResponse } = require('./../../utils/responseHanlder')
const TodoModel = require('./../../models/todo.mode')


router.post('/add-todo',  passport.authenticate('jwt', { session: false }), async(req,res) => {
  let { todo } = req.body
  let { _id: userid} = req.user
  console.log(todo)
  let { title, priority='Medium', status= 'Pending'} = todo

  if(!title) {
    return handleResponse(res, 400, 'Missing params')
  }

  let newTodo = await new TodoModel({
    title, userid, priority, status
  }).save()

  return handleResponse(res, 201, 'New Task added', newTodo)

})

router.get('/', passport.authenticate('jwt', { session: false }), async(req,res) => {
  let { _id: userid} = req.user
  let todos = await TodoModel.find({isDeleted:false, userid})
  return handleResponse(res,200, 'Todos fetched', todos)
})

router.post('/update-todo', async(req, res) => {
  let { _id, status } = req.status
  if(!status || !_id)  {
    return handleResponse(res, 400, 'Missing params')
  }

  if(status !== 'Completed'  || status !== 'Pending') {
    return handleResponse(res, 400, 'Invalid status type')
  }

  let exists = await TodoModel.findOne({ _id })
  if(!exists){
    return handleResponse(res, 400, 'Invalid todo')
  }

 let updatedTask = await TodoModel.updateOne({ _id}, {$set:{status}} )

  return handleResponse(res, 200, null, updatedTask)

})

router.post('/delete-todo/:id', async(req, res) => {
  let { id } = req.params
  console.log(id)
  await TodoModel.updateOne({ _id:id }, {$set: {isDeleted:true}})
  return handleResponse(res, 200, '')
})

module.exports  = router