import React, { useState, useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X, MapPin, Building } from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";

interface ContactInfoProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Clinic {
  id: string;
  name: string;
  address: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [newClinic, setNewClinic] = useState<{ name: string; address: string }>(
    {
      name: "",
      address: "",
    },
  );

  // Auto-fill phone number from mobile number
  useEffect(() => {
    if (formData.mobileNumber && !formData.phoneNumber) {
      updateFormData({ phoneNumber: formData.mobileNumber });
    }
  }, [formData.mobileNumber, formData.phoneNumber, updateFormData]);

  const handleAddClinic = () => {
    if (newClinic.name.trim() && newClinic.address.trim()) {
      const clinic: Clinic = {
        id: Date.now().toString(),
        name: newClinic.name.trim(),
        address: newClinic.address.trim(),
      };

      updateFormData({
        clinics: [...formData.clinics, clinic],
      });

      setNewClinic({ name: "", address: "" });
    }
  };

  const handleRemoveClinic = (clinicId: string) => {
    const updatedClinics = formData.clinics.filter(
      (clinic) => clinic.id !== clinicId,
    );
    updateFormData({ clinics: updatedClinics });
  };

  const handleUpdateClinic = (
    clinicId: string,
    field: "name" | "address",
    value: string,
  ) => {
    const updatedClinics = formData.clinics.map((clinic) =>
      clinic.id === clinicId ? { ...clinic, [field]: value } : clinic,
    );
    updateFormData({ clinics: updatedClinics });
  };

  const isFormValid = () => {
    return (
      formData.phoneNumber &&
      formData.email &&
      formData.clinics.length > 0 &&
      formData.clinics.every((clinic) => clinic.name && clinic.address)
    );
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Contact Information
            </h2>

            {/* Personal Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    updateFormData({ phoneNumber: e.target.value })
                  }
                  placeholder="Enter phone number"
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
                <div className="text-xs text-gray-500">
                  Auto-filled from mobile number
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="Enter your email address"
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
              </div>
            </div>

            {/* Clinic Information */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-doctor-text">
                    Clinic Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add all your clinic locations
                  </p>
                </div>
              </div>

              {/* Add New Clinic */}
              <Card className="mb-6 border-dashed border-2 border-doctor-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Plus className="w-5 h-5 text-doctor-primary mr-2" />
                    <h4 className="font-medium text-doctor-text">
                      Add New Clinic
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicName">Clinic Name</Label>
                      <Input
                        id="clinicName"
                        value={newClinic.name}
                        onChange={(e) =>
                          setNewClinic((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter clinic name"
                        className="focus:ring-doctor-primary focus:border-doctor-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinicAddress">Clinic Address</Label>
                      <Input
                        id="clinicAddress"
                        value={newClinic.address}
                        onChange={(e) =>
                          setNewClinic((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter complete address"
                        className="focus:ring-doctor-primary focus:border-doctor-primary"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddClinic}
                    disabled={
                      !newClinic.name.trim() || !newClinic.address.trim()
                    }
                    className="bg-doctor-primary hover:bg-doctor-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Clinic
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Clinics */}
              <div className="space-y-4">
                {formData.clinics.map((clinic, index) => (
                  <Card key={clinic.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Building className="w-5 h-5 text-doctor-primary mr-2" />
                          <h4 className="font-medium text-doctor-text">
                            Clinic {index + 1}
                          </h4>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveClinic(clinic.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Clinic Name</Label>
                          <Input
                            value={clinic.name}
                            onChange={(e) =>
                              handleUpdateClinic(
                                clinic.id,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Enter clinic name"
                            className="focus:ring-doctor-primary focus:border-doctor-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Clinic Address</Label>
                          <div className="relative">
                            <Input
                              value={clinic.address}
                              onChange={(e) =>
                                handleUpdateClinic(
                                  clinic.id,
                                  "address",
                                  e.target.value,
                                )
                              }
                              placeholder="Enter complete address"
                              className="focus:ring-doctor-primary focus:border-doctor-primary pl-8"
                            />
                            <MapPin className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {formData.clinics.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm">No clinics added yet</p>
                  <p className="text-xs">Add at least one clinic to continue</p>
                </div>
              )}
            </div>
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

export default ContactInfo;
