import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StepSidebar from "./StepSidebar";
import DoctorDetails from "./steps/DoctorDetails";
import ContactInfo from "./steps/ContactInfo";
import Education from "./steps/Education";
import Specialization from "./steps/Specialization";
import Availability from "./steps/Availability";
import Payment from "./steps/Payment";
import Review from "./steps/Review";

export interface DoctorFormData {
  // Step 1: Doctor Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  languages: string[];
  mobileNumber: string;
  isMobileVerified: boolean;
  resume: File | null;
  profilePicture: File | null;
  bio: string;
  awards: string[];

  // Step 2: Contact Information
  phoneNumber: string;
  email: string;
  clinics: Array<{
    id: string;
    name: string;
    address: string;
  }>;

  // Step 3: Education and Qualification
  highestDegree: string;
  university: string;
  medicalLicenseNumber: string;
  issuingAuthority: string;
  licenseDocument: File | null;
  licenseExpiryDate: string;

  // Step 4: Specialization
  speciality: string;
  services: string[];
  customServices: string[];

  // Step 5: Availability
  clinicAvailability: Record<
    string,
    {
      days: Record<
        string,
        {
          isWorking: boolean;
          workHours: { start: string; end: string };
          breakTime: { start: string; end: string };
        }
      >;
    }
  >;
  onlineConsultationHours: Record<
    string,
    {
      isAvailable: boolean;
      hours: { start: string; end: string };
      breakTime: { start: string; end: string };
    }
  >;

  // Step 6: Payment
  clinicVisitCharges: number;
  onlineConsultationCharges: number;
  paymentMethods: string[];
}

const initialFormData: DoctorFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  languages: [],
  mobileNumber: "",
  isMobileVerified: false,
  resume: null,
  profilePicture: null,
  bio: "",
  awards: [],
  phoneNumber: "",
  email: "",
  clinics: [],
  highestDegree: "",
  university: "",
  medicalLicenseNumber: "",
  issuingAuthority: "",
  licenseDocument: null,
  licenseExpiryDate: "",
  speciality: "",
  services: [],
  customServices: [],
  clinicAvailability: {},
  onlineConsultationHours: {},
  clinicVisitCharges: 0,
  onlineConsultationCharges: 0,
  paymentMethods: [],
};

const steps = [
  { id: 1, title: "Doctor Details", component: DoctorDetails },
  { id: 2, title: "Contact Information", component: ContactInfo },
  { id: 3, title: "Education & Qualification", component: Education },
  { id: 4, title: "Specialization", component: Specialization },
  { id: 5, title: "Availability", component: Availability },
  { id: 6, title: "Charges & Payment", component: Payment },
  { id: 7, title: "Review & Submit", component: Review },
];

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DoctorFormData>(initialFormData);

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const updateFormData = (data: Partial<DoctorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex">
        {/* Sidebar */}
        <StepSidebar
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-doctor-text mb-2">
                Doctor Registration
              </h1>
              <p className="text-gray-600 mb-4">
                Complete your profile to start practicing with us
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-doctor-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Step Content */}
            <Card className="shadow-lg border-0">
              <CurrentStepComponent
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirstStep={currentStep === 1}
                isLastStep={currentStep === steps.length}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
