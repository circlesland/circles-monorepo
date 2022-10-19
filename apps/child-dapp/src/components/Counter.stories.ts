import Counter from './Counter.svelte';

export default {
    title: 'TemplateApp/Counter',
    component: Counter
}

const Template = (args) => ({
    Component: Counter,
    props: { ...args }
})

export const Default = Template.bind({});
export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
    label: 'Custom Label -> Click me to increment'
};