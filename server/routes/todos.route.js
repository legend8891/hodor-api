import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import todoCtrl from '../controllers/todos.controller';
import pry from 'pryjs';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/todos - Get list of todos */
  .get(todoCtrl.index)

  /** POST /api/todos - Create new todo */
  // .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:todoId')
  /** GET /api/users/:userId - Get user */
  .get(todoCtrl.get)

  /** PUT /api/users/:userId - Update user */
  // .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(todoCtrl.destroy);

router.route('/:todoId/updateTodoState')
  .put(validate(paramValidation.updateTodoState), todoCtrl.updateTodoState)

/** Load user when API with userId route parameter is hit */
router.param('todoId', todoCtrl.load);

export default router;
