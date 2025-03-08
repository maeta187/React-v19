import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('action/:id', 'routes/action/action.tsx'),
  route('use-action-state', 'routes/useActionState/useActionState.tsx'),
  route('form-error', 'routes/useActionState/formError.tsx'),
  route(
    'display-structured-information',
    'routes/useActionState/displayStructuredInformation.tsx'
  ),
  route('use-form-status', 'routes/useFormStatus/useFormStatus.tsx'),
  route('use-optimistic', 'routes/useOptimistic/useOptimistic.tsx')
] satisfies RouteConfig
