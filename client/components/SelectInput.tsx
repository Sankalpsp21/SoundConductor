import { Center, CheckIcon, FormControl, Select, WarningOutlineIcon } from 'native-base';
import React from 'react';
import { Input, Output } from '../app/integrations/[id]';

interface Props {
      inputs?: Input[];
      outputs?: Output[];
}

export const SelectInput: React.FC<Props> = ({ inputs }) => {
      const empty = false;
      const [selected, setSelected] = React.useState("");
      const handleChange = (value: string) => {
            setSelected(value);
      };
      return (
            <Center>
                  <FormControl w="100%" maxW="500" isRequired isInvalid={empty}>
                        <FormControl.Label>Choose service</FormControl.Label>
                        <Select minWidth="100" accessibilityLabel="Choose Input" placeholder="Choose An Input"  _selectedItem={{
                              bg: "teal.600",
                              endIcon: <CheckIcon size={5}  onChange={handleChange} />,
                        }} mt="1">
                              {inputs?.map((input) => (
                                    <Select.Item key={input.id} label={input.inputName} value={input.inputName} />
                              ))}
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              Please make a selection!
                        </FormControl.ErrorMessage>
                  </FormControl>
            </Center>
      )
};

export const SelectOutput: React.FC<Props> = ({ outputs }) => {
      const empty = false;
      const [selected, setSelected] = React.useState("");
      const handleChange = (value: string) => {
            setSelected(value);
      };
      return (
            <Center>
                  <FormControl w="100%" maxW="500" isRequired isInvalid={empty}>
                        <FormControl.Label>Select An Input</FormControl.Label>
                        <Select minWidth="100" accessibilityLabel="Choose Output" placeholder="Choose An Output"  _selectedItem={{
                              bg: "teal.600",
                              endIcon: <CheckIcon size={5}  onChange={handleChange} />,
                        }} mt="1">
                              {outputs?.map((output) => (
                                    <Select.Item key={output.id} label={output.outputName} value={output.outputName} />
                              ))}
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              Please make a selection!
                        </FormControl.ErrorMessage>
                  </FormControl>
            </Center>
      )
}
