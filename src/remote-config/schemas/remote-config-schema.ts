import _Joi from 'joi'

// All keys are:
// - required
// - extra properties are allowed
const Joi = _Joi.defaults((schema) => schema.options({ presence: 'required', allowUnknown: true }))

export const globalsSchema = Joi.object({
  something: Joi.string(),
  somethingElse: Joi.string().min(5),
}).meta({ className: 'RemoteConfigGlobals' })

// TODO maybe this gets passed from somewhere
export const remoteConfigSchemaRaw = Joi.object({
  globals: globalsSchema,
}).meta({ className: 'RemoteConfigRaw' })
