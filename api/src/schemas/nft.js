'use strict';

const Joi = require('../../utils/joi');

const { AGREEMENT_TYPES, DEVICE_TYPES } = require('../../constants');

module.exports = {
    getForcedAgreements: {
        validate: {
            query: (
                Joi
                    .object()
                    .keys({
                        clientId: Joi.objectId().required(),
                        deviceId: Joi.string().required(),
                        countryCode: Joi.string().required(),
                        deviceType: Joi.string().required(),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object().keys({
                    agreements: Joi.array(),
                    bottomSheetType: Joi.number(),
                })
            ),
        },
    },
    updateForced: {
        validate: {
            params: (
                Joi
                    .object()
                    .keys({
                        agreementId: Joi.objectId().required(),
                    })
            ),
            payload: (
                Joi
                    .object()
                    .keys({
                        isForced: Joi.boolean().required(),
                        countryCode: Joi.string().required(),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        success: Joi.boolean(),
                    })
            ),
        },
    },
    generateAgreementUploadUrls: {
        validate: {
            payload: (
                Joi
                    .object()
                    .keys({
                        type: Joi.number().required().valid(...Object.values(AGREEMENT_TYPES)),
                        countryCode: Joi.string().required(),
                        languages: Joi.array().items(Joi.string()).required(),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        preSignedUrls: Joi.array().items(Joi.object().keys({
                            language: Joi.string(),
                            preSignedUrl: Joi.string(),
                        })),
                        files: Joi.array().items(Joi.object().keys({
                            language: Joi.string(),
                            name: Joi.string(),
                        })),
                        nextVersion: Joi.number(),
                    })
            ),
        },
    },
    createAgreement: {
        validate: {
            payload: (
                Joi
                    .object()
                    .keys({
                        type: Joi.number().required().valid(...Object.values(AGREEMENT_TYPES)),
                        countryCode: Joi.string().required(),
                        files: Joi.array().items(Joi.object().keys({
                            language: Joi.string(),
                            name: Joi.string(),
                        })).required(),
                        nextVersion: Joi.number().required(),
                        uploadedBy: Joi.objectId().required(),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        success: Joi.boolean(),
                    })
            ),
        },
    },
    getAgreements: {
        validate: {
            payload: (
                Joi
                    .object()
                    .keys({
                        types: Joi.array().items(Joi.number()),
                        countryCode: Joi.string().lowercase(),
                        deviceType: Joi.string(),
                        latest: Joi.boolean(),
                        forced: Joi.boolean(),
                        limit: Joi.number().default(10).max(100),
                        page: Joi.objectId(),
                        fields: Joi.string().default('type countryCode urls version latest forced'),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        agreements: Joi.array().items(Joi.object()),
                        prev: Joi.objectId(),
                        next: Joi.objectId(),
                    })
            ),
        },
    },
    getSpecificAgreements: {
        validate: {
            query: (
                Joi
                    .object()
                    .keys({
                        countryCode: Joi.string().required(),
                        deviceType: Joi.string().required().valid(...Object.values(DEVICE_TYPES)),
                        fields: Joi.string(),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        agreements: Joi.array().items(Joi.object()),
                    })
            ),
        },
    },
    getAgreementsForClient: {
        validate: {
            query: (
                Joi
                    .object()
                    .keys({
                        countryCode: Joi.string().required(),
                        clientId: Joi.objectId().required(),
                        deviceId: Joi.string().required(),
                        deviceType: Joi.string().required().valid(...Object.values(DEVICE_TYPES)),
                    })
            ),
        },
        response: {
            schema: (
                Joi
                    .object()
                    .keys({
                        registrationAgreements: Joi.object().keys({
                            agreements: Joi.array().items(Joi.object()),
                        }),
                        forcedAgreements: Joi.object().keys({
                            agreements: Joi.array().items(Joi.object()),
                            bottomSheetType: Joi.number(),
                        }),
                    })
            ),
        },
    },
};
