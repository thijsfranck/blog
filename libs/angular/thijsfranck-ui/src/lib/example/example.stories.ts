import type { Meta, StoryObj } from "@storybook/angular";
import { Example } from "./example";

const meta: Meta<Example> = {
    component: Example,
    title: "Example",
};
export default meta;

type Story = StoryObj<Example>;

export const Primary: Story = {};
