import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('action/:id', 'routes/action/action.tsx'),
  route('useActionState', 'routes/useActionState/useActionState.tsx'),
] satisfies RouteConfig
