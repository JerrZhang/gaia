import { defineConcept, t } from '@hayadev/configurator';

export const backgroundStyle = defineConcept({
    name: 'backgroundStyle',
    displayName: 'background ',
    items: {
        background: {
            type: 'select',
            name: t`background`,
            options: {
                transparent: t`transparent`,
                color: t`color`,
                image: t`image`,
            },
        },
        backgroundColor: {
            type: 'if',
            name: t`backgroundColor`,
            condition: { field: 'background', value: 'color' },
            child: {
                type: 'color',
                name: t`backgroundColor`,
            },
        },
        backgroundImage: {
            type: 'if',
            name: t`backgroundImage`,
            condition: { field: 'background', value: 'image' },
            child: {
                type: 'image',
                name: t`backgroundImage`,
            },
        },
        backgroundImageFill: {
            type: 'if',
            name: t`backgroundImageFill`,
            condition: { field: 'background', value: 'image' },
            child: {
                type: 'select',
                name: t`backgroundImageFill`,
                options: {
                    contain: t`contain`,
                    cover: t`cover`,
                },
            },
        },
    },
});
