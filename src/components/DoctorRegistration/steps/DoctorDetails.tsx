import React, { useState, useRef } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Plus, CheckCircle, Send } from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";
import { cn } from "@/lib/utils";

interface DoctorDetailsProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Odia",
  "Assamese",
];

const DoctorDetails: React.FC<DoctorDetailsProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
  isFirstStep,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newAward, setNewAward] = useState("");
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const handleLanguageToggle = (language: string) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter((lang) => lang !== language)
      : [...formData.languages, language];
    updateFormData({ languages: updatedLanguages });
  };

  const handleSendOtp = () => {
    if (formData.mobileNumber && formData.mobileNumber.length === 10) {
      setOtpSent(true);
      // Simulate OTP sending
      setTimeout(() => {
        alert("OTP sent to your mobile number");
      }, 500);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      // Mock OTP verification
      updateFormData({ isMobileVerified: true });
      alert("Mobile number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ profilePicture: file });
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ resume: file });
      // Simulate auto-filling bio from resume
      const mockBio =
        "Experienced medical professional with extensive background in patient care and clinical excellence. Dedicated to providing comprehensive healthcare services with a focus on patient-centered approach.";
      updateFormData({ bio: mockBio });
    }
  };

  const handleAddAward = () => {
    if (newAward.trim()) {
      updateFormData({ awards: [...formData.awards, newAward.trim()] });
      setNewAward("");
    }
  };

  const handleRemoveAward = (index: number) => {
    const updatedAwards = formData.awards.filter((_, i) => i !== index);
    updateFormData({ awards: updatedAwards });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dateOfBirth &&
      formData.mobileNumber &&
      formData.isMobileVerified &&
      formData.languages.length > 0 &&
      formData.bio
    );
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Doctor Details
            </h2>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    updateFormData({ firstName: e.target.value })
                  }
                  placeholder="Enter your first name"
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  placeholder="Enter your last name"
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    updateFormData({ dateOfBirth: e.target.value })
                  }
                  className="focus:ring-doctor-primary focus:border-doctor-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      updateFormData({ mobileNumber: e.target.value })
                    }
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className="focus:ring-doctor-primary focus:border-doctor-primary"
                  />
                  <Button
                    type="button"
                    variant={formData.isMobileVerified ? "default" : "outline"}
                    onClick={
                      formData.isMobileVerified ? undefined : handleSendOtp
                    }
                    disabled={
                      formData.isMobileVerified ||
                      formData.mobileNumber.length !== 10
                    }
                    className={cn(
                      "px-4",
                      formData.isMobileVerified &&
                        "bg-green-600 hover:bg-green-700",
                    )}
                  >
                    {formData.isMobileVerified ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>

                {otpSent && !formData.isMobileVerified && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      maxLength={6}
                      className="focus:ring-doctor-primary focus:border-doctor-primary"
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                      className="bg-doctor-primary hover:bg-doctor-primary/90"
                    >
                      Verify OTP
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <Label className="text-base font-medium">
                Languages Spoken *
              </Label>
              <Tabs defaultValue="languages" className="w-full mt-2">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="languages">Select Languages</TabsTrigger>
                </TabsList>
                <TabsContent value="languages" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {languages.map((language) => (
                      <div
                        key={language}
                        onClick={() => handleLanguageToggle(language)}
                        className={cn(
                          "p-3 border rounded-lg cursor-pointer transition-all",
                          formData.languages.includes(language)
                            ? "bg-doctor-primary text-white border-doctor-primary"
                            : "bg-white border-gray-200 hover:border-doctor-primary hover:bg-doctor-primary/5",
                        )}
                      >
                        <span className="text-sm font-medium">{language}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Profile Picture */}
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    {formData.profilePicture ? (
                      <AvatarImage
                        src={URL.createObjectURL(formData.profilePicture)}
                      />
                    ) : (
                      <AvatarFallback className="bg-doctor-primary/10 text-doctor-primary text-lg">
                        {formData.firstName?.[0]}
                        {formData.lastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    ref={profilePictureRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => profilePictureRef.current?.click()}
                    className="border-doctor-primary text-doctor-primary hover:bg-doctor-primary hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Picture
                  </Button>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <Label>Resume *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.resume ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-doctor-text">
                        {formData.resume.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round(formData.resume.size / 1024)} KB
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateFormData({ resume: null, bio: "" })
                        }
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-2">
                        Upload your resume
                      </div>
                      <input
                        ref={resumeRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => resumeRef.current?.click()}
                        className="border-doctor-primary text-doctor-primary hover:bg-doctor-primary hover:text-white"
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio/Description */}
            <div className="mb-8">
              <Label htmlFor="bio">Bio/Description *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData({ bio: e.target.value })}
                placeholder="Tell us about yourself, your experience, and expertise..."
                rows={4}
                className="focus:ring-doctor-primary focus:border-doctor-primary mt-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                This will be auto-filled when you upload your resume
              </div>
            </div>

            {/* Awards */}
            <div>
              <Label>Awards & Recognitions</Label>
              <div className="mt-2">
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newAward}
                    onChange={(e) => setNewAward(e.target.value)}
                    placeholder="Add an award or recognition"
                    className="focus:ring-doctor-primary focus:border-doctor-primary"
                    onKeyPress={(e) => e.key === "Enter" && handleAddAward()}
                  />
                  <Button
                    type="button"
                    onClick={handleAddAward}
                    disabled={!newAward.trim()}
                    className="bg-doctor-primary hover:bg-doctor-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.awards.map((award, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-doctor-primary/10 text-doctor-primary px-3 py-1"
                    >
                      {award}
                      <button
                        type="button"
                        onClick={() => handleRemoveAward(index)}
                        className="ml-2 text-doctor-primary/70 hover:text-doctor-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
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
          disabled={isFirstStep}
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

export default DoctorDetails;
