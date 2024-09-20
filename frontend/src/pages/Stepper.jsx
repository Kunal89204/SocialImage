import React, { useState } from 'react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Button,
  Input
} from '@chakra-ui/react';

const steps = [
  { title: 'First', description: 'Contact Info', form: <Input placeholder="Enter your contact info" /> },
  { title: 'Second', description: 'Date & Time', form: <Input placeholder="Enter date and time" /> },
  { title: 'Third', description: 'Select Rooms', form: <Input placeholder="Select rooms" /> },
];

const StepperPage = () => {
  const [formData, setFormData] = useState({ 0: '', 1: '', 2: '' });
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleInputChange = (index, value) => {
    setFormData((prevData) => ({ ...prevData, [index]: value }));
  };

  const handleNext = () => {
    if (formData[activeStep]) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box width="400px" margin="auto" padding="4">
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      
      <Box mt="8">
        {steps.map((step, index) => (
          <Box key={index} display={activeStep === index ? 'block' : 'none'}>
            {React.cloneElement(step.form, {
              value: formData[index],
              onChange: (e) => handleInputChange(index, e.target.value),
            })}
          </Box>
        ))}
      </Box>

      <Box mt="4" display="flex" justifyContent="space-between">
        <Button onClick={handlePrev} isDisabled={activeStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} isDisabled={!formData[activeStep]}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StepperPage;
