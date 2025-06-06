import React, { useState, useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Search,
  Heart,
  Microscope,
  Brain,
  Bone,
  Baby,
  UserCheck,
  Stethoscope,
  Users,
  Ear,
  Eye,
  Activity,
  Zap,
  Shield,
  Camera,
  Syringe,
  Ambulance,
  FlaskConical,
  Dumbbell,
  Wind,
  Pill,
} from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";
import { cn } from "@/lib/utils";

interface SpecializationProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const specialities = [
  { name: "Cardiology", icon: Heart },
  { name: "Dermatology", icon: Microscope },
  { name: "Neurology", icon: Brain },
  { name: "Orthopedics", icon: Bone },
  { name: "Pediatrics", icon: Baby },
  { name: "Psychiatry", icon: UserCheck },
  { name: "General Medicine", icon: Stethoscope },
  { name: "Gynecology", icon: Users },
  { name: "ENT", icon: Ear },
  { name: "Ophthalmology", icon: Eye },
  { name: "Dentistry", icon: Pill },
  { name: "Urology", icon: Activity },
  { name: "Gastroenterology", icon: Zap },
  { name: "Pulmonology", icon: Wind },
  { name: "Oncology", icon: Shield },
  { name: "Radiology", icon: Camera },
  { name: "Anesthesiology", icon: Syringe },
  { name: "Emergency Medicine", icon: Ambulance },
  { name: "Pathology", icon: FlaskConical },
  { name: "Physical Medicine", icon: Dumbbell },
];

const servicesBySpeciality = {
  Cardiology: [
    "ECG",
    "Echocardiography",
    "Stress Testing",
    "Heart Surgery Consultation",
    "Arrhythmia Treatment",
    "Heart Disease Prevention",
    "Cholesterol Management",
  ],
  Dermatology: [
    "Acne Treatment",
    "Skin Cancer Screening",
    "Mole Removal",
    "Laser Therapy",
    "Anti-aging Treatments",
    "Psoriasis Treatment",
    "Eczema Management",
  ],
  Neurology: [
    "Migraine Treatment",
    "Epilepsy Management",
    "Stroke Care",
    "Memory Disorders",
    "Parkinson Disease Treatment",
    "Multiple Sclerosis Care",
    "Nerve Disorders",
  ],
  Orthopedics: [
    "Joint Replacement",
    "Fracture Treatment",
    "Sports Injury",
    "Arthritis Care",
    "Spine Surgery",
    "Physical Therapy",
    "Pain Management",
  ],
  Pediatrics: [
    "Child Health Checkups",
    "Vaccination",
    "Growth Monitoring",
    "Developmental Assessment",
    "Childhood Infections",
    "Nutrition Counseling",
    "Behavioral Issues",
  ],
  Psychiatry: [
    "Depression Treatment",
    "Anxiety Therapy",
    "Counseling",
    "Medication Management",
    "Addiction Treatment",
    "Stress Management",
    "Trauma Therapy",
  ],
  "General Medicine": [
    "Routine Checkups",
    "Diabetes Management",
    "Hypertension Treatment",
    "Preventive Care",
    "Health Screening",
    "Minor Procedures",
    "Chronic Disease Management",
  ],
  Gynecology: [
    "Prenatal Care",
    "Family Planning",
    "Menstrual Disorders",
    "Fertility Treatment",
    "Gynecological Surgery",
    "Menopause Management",
    "Cancer Screening",
  ],
  ENT: [
    "Hearing Tests",
    "Sinus Treatment",
    "Throat Surgery",
    "Voice Disorders",
    "Sleep Apnea Treatment",
    "Allergy Management",
    "Ear Infections",
  ],
  Ophthalmology: [
    "Eye Exams",
    "Cataract Surgery",
    "Glaucoma Treatment",
    "Retinal Disorders",
    "LASIK Surgery",
    "Diabetic Eye Care",
    "Contact Lens Fitting",
  ],
  Dentistry: [
    "Dental Checkups",
    "Teeth Cleaning",
    "Fillings",
    "Root Canal Treatment",
    "Orthodontics",
    "Cosmetic Dentistry",
    "Oral Surgery",
  ],
  Urology: [
    "Kidney Stone Treatment",
    "Prostate Care",
    "Bladder Disorders",
    "Male Infertility",
    "Urinary Tract Infections",
    "Minimally Invasive Surgery",
    "Cancer Treatment",
  ],
  Gastroenterology: [
    "Endoscopy",
    "Colonoscopy",
    "Liver Disease Treatment",
    "Digestive Disorders",
    "IBD Management",
    "Acid Reflux Treatment",
    "Nutritional Counseling",
  ],
  Pulmonology: [
    "Asthma Treatment",
    "COPD Management",
    "Sleep Studies",
    "Lung Function Tests",
    "Bronchoscopy",
    "Respiratory Infections",
    "Smoking Cessation",
  ],
  Oncology: [
    "Cancer Screening",
    "Chemotherapy",
    "Radiation Therapy",
    "Immunotherapy",
    "Palliative Care",
    "Clinical Trials",
    "Genetic Counseling",
  ],
  Radiology: [
    "X-rays",
    "MRI Scans",
    "CT Scans",
    "Ultrasound",
    "Mammography",
    "Nuclear Medicine",
    "Interventional Procedures",
  ],
  Anesthesiology: [
    "Surgical Anesthesia",
    "Pain Management",
    "Critical Care",
    "Regional Blocks",
    "Sedation",
    "Post-operative Care",
    "Chronic Pain Treatment",
  ],
  "Emergency Medicine": [
    "Trauma Care",
    "Emergency Surgery",
    "Critical Care",
    "Poison Treatment",
    "Cardiac Emergencies",
    "Respiratory Emergencies",
    "Wound Care",
  ],
  Pathology: [
    "Laboratory Tests",
    "Biopsy Analysis",
    "Blood Tests",
    "Tissue Examination",
    "Autopsy",
    "Molecular Diagnostics",
    "Cytology",
  ],
  "Physical Medicine": [
    "Rehabilitation",
    "Physical Therapy",
    "Occupational Therapy",
    "Pain Management",
    "Sports Medicine",
    "Injury Recovery",
    "Mobility Training",
  ],
};

const Specialization: React.FC<SpecializationProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customService, setCustomService] = useState("");
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  useEffect(() => {
    if (formData.speciality) {
      const services =
        servicesBySpeciality[
          formData.speciality as keyof typeof servicesBySpeciality
        ] || [];
      setAvailableServices(services);
    } else {
      setAvailableServices([]);
    }
  }, [formData.speciality]);

  const handleSpecialitySelect = (speciality: string) => {
    updateFormData({
      speciality: speciality,
      services: [], // Reset services when speciality changes
      customServices: [],
    });
  };

  const handleServiceToggle = (service: string) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];
    updateFormData({ services: updatedServices });
  };

  const handleAddCustomService = () => {
    if (customService.trim()) {
      updateFormData({
        customServices: [...formData.customServices, customService.trim()],
      });
      setCustomService("");
    }
  };

  const handleRemoveCustomService = (index: number) => {
    const updatedCustomServices = formData.customServices.filter(
      (_, i) => i !== index,
    );
    updateFormData({ customServices: updatedCustomServices });
  };

  const filteredSpecialities = specialities.filter((speciality) =>
    speciality.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredServices = availableServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isFormValid = () => {
    return (
      formData.speciality &&
      (formData.services.length > 0 || formData.customServices.length > 0)
    );
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Specialization
            </h2>

            <Tabs defaultValue="speciality" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="speciality">Select Speciality</TabsTrigger>
                <TabsTrigger
                  value="services"
                  disabled={!formData.speciality}
                  className="disabled:opacity-50"
                >
                  Services Offered
                </TabsTrigger>
              </TabsList>

              {/* Speciality Selection */}
              <TabsContent value="speciality" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search specialities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:ring-doctor-primary focus:border-doctor-primary"
                    />
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Note:</strong> You can only select one speciality.
                    Choose carefully as this will determine your available
                    services.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSpecialities.map((speciality) => {
                      const IconComponent = speciality.icon;

                      return (
                        <div
                          key={speciality.name}
                          onClick={() =>
                            handleSpecialitySelect(speciality.name)
                          }
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                            formData.speciality === speciality.name
                              ? "bg-doctor-primary text-white border-doctor-primary shadow-md"
                              : "bg-white border-gray-200 hover:border-doctor-primary hover:bg-doctor-primary/5",
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                formData.speciality === speciality.name
                                  ? "bg-white/20"
                                  : "bg-doctor-primary/10",
                              )}
                            >
                              <IconComponent
                                className={cn(
                                  "w-6 h-6",
                                  formData.speciality === speciality.name
                                    ? "text-white"
                                    : "text-doctor-primary",
                                )}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{speciality.name}</p>
                              <p
                                className={cn(
                                  "text-xs",
                                  formData.speciality === speciality.name
                                    ? "text-white/80"
                                    : "text-gray-500",
                                )}
                              >
                                Click to select
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {formData.speciality && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">
                          Selected:
                        </span>
                        <Badge className="bg-doctor-primary">
                          {formData.speciality}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Services Selection */}
              <TabsContent value="services" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-doctor-text mb-4">
                      Services for {formData.speciality}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <Search className="w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="focus:ring-doctor-primary focus:border-doctor-primary"
                      />
                    </div>

                    {/* Standard Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {filteredServices.map((service) => (
                        <div
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={cn(
                            "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                            formData.services.includes(service)
                              ? "bg-doctor-primary text-white border-doctor-primary"
                              : "bg-white border-gray-200 hover:border-doctor-primary hover:bg-doctor-primary/5",
                          )}
                        >
                          <span className="text-sm font-medium">{service}</span>
                        </div>
                      ))}
                    </div>

                    {/* Custom Services */}
                    <div className="border-t pt-6">
                      <Label className="text-base font-medium">
                        Add Custom Service
                      </Label>
                      <div className="flex gap-2 mt-2 mb-4">
                        <Input
                          value={customService}
                          onChange={(e) => setCustomService(e.target.value)}
                          placeholder="Enter custom service name"
                          className="focus:ring-doctor-primary focus:border-doctor-primary"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddCustomService()
                          }
                        />
                        <Button
                          type="button"
                          onClick={handleAddCustomService}
                          disabled={!customService.trim()}
                          className="bg-doctor-primary hover:bg-doctor-primary/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {formData.customServices.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Custom Services Added:
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {formData.customServices.map((service, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-doctor-accent/10 text-doctor-accent px-3 py-1"
                              >
                                {service}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveCustomService(index)
                                  }
                                  className="ml-2 text-doctor-accent/70 hover:text-doctor-accent"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Services Summary */}
                    {(formData.services.length > 0 ||
                      formData.customServices.length > 0) && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">
                          Selected Services (
                          {formData.services.length +
                            formData.customServices.length}
                          )
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            ...formData.services,
                            ...formData.customServices,
                          ].map((service, index) => (
                            <Badge key={index} className="bg-blue-600">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-8 bg-gray-50">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="border-gray-300"
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-doctor-primary hover:bg-doctor-primary/90 px-8"
        >
          Next Step
        </Button>
      </CardFooter>
    </>
  );
};

export default Specialization;
