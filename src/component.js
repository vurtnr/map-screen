import { Modal, Button } from 'ant-design-vue'

export function registerComponent(app) {
  app.use(Modal).use(Button)
}