import React, { useState, useRef } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload, X, FileText, Check, ChevronsUpDown } from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";
import { cn } from "@/lib/utils";

interface EducationProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const degrees = [
  "MBBS",
  "MD",
  "MS",
  "MCh",
  "DM",
  "DNB",
  "BHMS",
  "BAMS",
  "BDS",
  "MDS",
  "BPT",
  "MPT",
  "BSc Nursing",
  "MSc Nursing",
  "Other",
];

const universities = [
  "All Institute of Medical Sciences (AIIMS)",
  "Maulana Azad Medical College",
  "King George Medical University",
  "Jawaharlal Institute of Postgraduate Medical Education and Research",
  "Christian Medical College",
  "Armed Forces Medical College",
  "Bangalore Medical College and Research Institute",
  "Government Medical College",
  "Sri Ramachandra Institute of Higher Education and Research",
  "Kasturba Medical College",
  "Madras Medical College",
  "Grant Medical College",
  "Seth Gordhandas Sunderdas Medical College",
  "University College of Medical Sciences",
  "Lady Hardinge Medical College",
  "Vardhman Mahavir Medical College",
  "Topiwala National Medical College",
  "Lokmanya Tilak Municipal Medical College",
  "Rajiv Gandhi University of Health Sciences",
  "Maharashtra University of Health Sciences",
];

const authorities = [
  "Medical Council of India (MCI)",
  "National Medical Commission (NMC)",
  "State Medical Council",
  "Dental Council of India",
  "Central Council of Homoeopathy",
  "Central Council of Indian Medicine",
  "Indian Association of Physiotherapists",
  "Nursing Council of India",
  "Other",
];

const Education: React.FC<EducationProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [degreeOpen, setDegreeOpen] = useState(false);
  const [universityOpen, setUniversityOpen] = useState(false);
  const [authorityOpen, setAuthorityOpen] = useState(false);
  const licenseRef = useRef<HTMLInputElement>(null);

  const handleLicenseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ licenseDocument: file });
    }
  };

  const isFormValid = () => {
    return (
      formData.highestDegree &&
      formData.university &&
      formData.medicalLicenseNumber &&
      formData.issuingAuthority &&
      formData.licenseExpiryDate &&
      formData.licenseDocument
    );
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Education & Qualification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Highest Degree */}
              <div className="space-y-2">
                <Label>Highest Degree *</Label>
                <Popover open={degreeOpen} onOpenChange={setDegreeOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={degreeOpen}
                      className="w-full justify-between focus:ring-doctor-primary focus:border-doctor-primary"
                    >
                      {formData.highestDegree || "Select degree..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search degree..." />
                      <CommandList>
                        <CommandEmpty>No degree found.</CommandEmpty>
                        <CommandGroup>
                          {degrees.map((degree) => (
                            <CommandItem
                              key={degree}
                              value={degree}
                              onSelect={() => {
                                updateFormData({ highestDegree: degree });
                                setDegreeOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.highestDegree === degree
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {degree}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* University/Institute */}
              <div className="space-y-2">
                <Label>University/Institute *</Label>
                <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={universityOpen}
                      className="w-full justify-between focus:ring-doctor-primary focus:border-doctor-primary"
                    >
                      {formData.university || "Select university..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search university..." />
                      <CommandList>
                        <CommandEmpty>No university found.</CommandEmpty>
                        <CommandGroup>
                          {universities.map((university) => (
                            <CommandItem
                              key={university}
                              value={university}
                              onSelect={() => {
                                updateFormData({ university: university });
                                setUniversityOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.university === university
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {university}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Medical License Number */}
              <div className="space-y-2">
                <Label htmlFor="medicalLicenseNumber">
                  Medical License Number *
                </Label>
                <Input
                  id="medicalLicenseNumber"
                  value={formData.medicalLicenseNumber}
                  onChange={(e) =>
                    updateFormData({ medicalLicenseNumber: e.target.value })
                  }
                  placeholder="Enter license number"
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
              </div>

              {/* Issuing Authority */}
              <div className="space-y-2">
                <Label>Issuing Authority *</Label>
                <Popover open={authorityOpen} onOpenChange={setAuthorityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={authorityOpen}
                      className="w-full justify-between focus:ring-doctor-primary focus:border-doctor-primary"
                    >
                      {formData.issuingAuthority || "Select authority..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search authority..." />
                      <CommandList>
                        <CommandEmpty>No authority found.</CommandEmpty>
                        <CommandGroup>
                          {authorities.map((authority) => (
                            <CommandItem
                              key={authority}
                              value={authority}
                              onSelect={() => {
                                updateFormData({ issuingAuthority: authority });
                                setAuthorityOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.issuingAuthority === authority
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {authority}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* License Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="licenseExpiryDate">License Expiry Date *</Label>
                <Input
                  id="licenseExpiryDate"
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={(e) =>
                    updateFormData({ licenseExpiryDate: e.target.value })
                  }
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* License Document Upload */}
            <div className="mb-8">
              <Label>Attach Medical License *</Label>
              <div className="mt-2">
                {formData.licenseDocument ? (
                  <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-green-800">
                          {formData.licenseDocument.name}
                        </div>
                        <div className="text-xs text-green-600">
                          {Math.round(formData.licenseDocument.size / 1024)} KB
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => licenseRef.current?.click()}
                        className="border-green-200 text-green-700 hover:bg-green-100"
                      >
                        Replace
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateFormData({ licenseDocument: null })
                        }
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-doctor-primary/30 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-doctor-primary/60 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 mb-4">
                      Upload your medical license document
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      Supported formats: PDF, JPG, PNG (Max 5MB)
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => licenseRef.current?.click()}
                      className="border-doctor-primary text-doctor-primary hover:bg-doctor-primary hover:text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}

                <input
                  ref={licenseRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleLicenseUpload}
                  className="hidden"
                />
              </div>
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

export default Education;
