import {
  render,
  fireEvent,
  waitFor,
  getByDisplayValue,
} from "@testing-library/react";
import Form from '../component/form';

test('renders form', () => {
    render(<Form/>);
  });

test('text fields update', async () => {
  const {container} = render(<Form/>)

  const textInput = container.querySelector("#incidentTitle");

  fireEvent.change(textInput, { target: { value: "Test incident title" } });
  expect(textInput.value).toBe("Test incident title");

})

test('submit button status update', async () => {
  const {container} = render(<Form/>)
  const submitButton = container.querySelector("button[type='submit']");

  await waitFor(() => {
    fireEvent.click(submitButton)
    
  });



})