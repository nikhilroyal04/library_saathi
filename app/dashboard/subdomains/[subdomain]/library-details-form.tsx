'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { saveLibraryDetailsAction } from '@/actions';
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Image as ImageIcon, 
  X, 
  Upload,
  Info,
  Users,
  Calendar,
  Building2,
  MessageSquare,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { protocol, rootDomain } from '@/lib/utils';
import type { LibraryDetails } from '@/lib/subdomains';
import type { Library } from '@/lib/store/librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectLibraries, updateLibrary, fetchLibraries } from '@/lib/store/librarySlice';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import ContactTab from './components/contact-tab';
import AboutTab from './components/about-tab';
import GalleryTab from './components/gallery-tab';
import FacilitiesTab from './components/facilities-tab';
import ShiftsTab from './components/shifts-tab';
import TestimonialTab from './components/testimonial-tab';
import FaqsTab from './components/faqs-tab';
import SeoTab from './components/seo-tab';

// Extend LibraryDetails to include all Library properties
type ExtendedLibraryDetails = LibraryDetails & Partial<Library>;

export default function LibraryDetailsForm({
  subdomain,
  initialData
}: {
  subdomain: string;
  initialData: LibraryDetails;
}) {
  const dispatch = useDispatch();
  const libraries = useSelector(selectLibraries);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch libraries on mount
  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  // Get library from Redux by subdomain
  const libraryData = useMemo(() => {
    if (!libraries || !Array.isArray(libraries)) return null;
    return libraries.find(lib => lib?.subdomain === subdomain);
  }, [libraries, subdomain]);

  // Use Redux data if available, otherwise use initialData
  const formData = libraryData || (initialData as ExtendedLibraryDetails);
  
  // Logo state
  const [logoPreview, setLogoPreview] = useState<string | null>(formData.logo || null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const form = e.currentTarget;
      const formDataObj = new FormData(form);
      
      // Collect shifts data
      const shifts: any[] = [];
      let shiftIndex = 0;
      while (formDataObj.get(`shifts[${shiftIndex}][name]`)) {
        shifts.push({
          name: formDataObj.get(`shifts[${shiftIndex}][name]`) as string,
          time: formDataObj.get(`shifts[${shiftIndex}][time]`) as string || '',
          icon: formDataObj.get(`shifts[${shiftIndex}][icon]`) as string || '',
          color: formDataObj.get(`shifts[${shiftIndex}][color]`) as string || '',
          description: formDataObj.get(`shifts[${shiftIndex}][description]`) as string || ''
        });
        shiftIndex++;
      }

      // Collect facilities data
      const facilities: any[] = [];
      let facilityIndex = 0;
      while (formDataObj.get(`facilities[${facilityIndex}][name]`)) {
        facilities.push({
          name: formDataObj.get(`facilities[${facilityIndex}][name]`) as string,
          description: formDataObj.get(`facilities[${facilityIndex}][description]`) as string || '',
          icon: formDataObj.get(`facilities[${facilityIndex}][icon]`) as string || '',
          color: formDataObj.get(`facilities[${facilityIndex}][color]`) as string || ''
        });
        facilityIndex++;
      }

      // Collect testimonials data
      const testimonials: any[] = [];
      let testimonialIndex = 0;
      while (formDataObj.get(`testimonials[${testimonialIndex}][name]`)) {
        testimonials.push({
          name: formDataObj.get(`testimonials[${testimonialIndex}][name]`) as string,
          role: formDataObj.get(`testimonials[${testimonialIndex}][role]`) as string || '',
          rating: formDataObj.get(`testimonials[${testimonialIndex}][rating]`) ? parseInt(formDataObj.get(`testimonials[${testimonialIndex}][rating]`) as string) : undefined,
          image: formDataObj.get(`testimonials[${testimonialIndex}][image]`) as string || '',
          text: formDataObj.get(`testimonials[${testimonialIndex}][text]`) as string || ''
        });
        testimonialIndex++;
      }

      // Collect FAQs data
      const faqs: any[] = [];
      let faqIndex = 0;
      while (formDataObj.get(`faqs[${faqIndex}][question]`)) {
        faqs.push({
          question: formDataObj.get(`faqs[${faqIndex}][question]`) as string,
          answer: formDataObj.get(`faqs[${faqIndex}][answer]`) as string || '',
          icon: formDataObj.get(`faqs[${faqIndex}][icon]`) as string || ''
        });
        faqIndex++;
      }

      // Collect gallery data
      const gallery: any[] = [];
      let galleryIndex = 0;
      while (formDataObj.get(`gallery[${galleryIndex}][title]`) || formDataObj.get(`gallery[${galleryIndex}][image]`)) {
        gallery.push({
          title: formDataObj.get(`gallery[${galleryIndex}][title]`) as string || `Gallery ${galleryIndex + 1}`,
          description: formDataObj.get(`gallery[${galleryIndex}][description]`) as string || '',
          image: formDataObj.get(`gallery[${galleryIndex}][image]`) as string || '',
          icon: formDataObj.get(`gallery[${galleryIndex}][icon]`) as string || '📷',
          color: formDataObj.get(`gallery[${galleryIndex}][color]`) as string || 'blue'
        });
        galleryIndex++;
      }

      // Build library update object
      const updates: Partial<Library> = {
        name: formDataObj.get('name') as string || formData.name,
        description: formDataObj.get('description') as string || formData.description,
        logo: logoPreview || formData.logo,
        emoji: formDataObj.get('emoji') as string || formData.emoji,
        topbar: formDataObj.get('topbar') as string || formData.topbar,
        email: formDataObj.get('email') as string || formData.email,
        phone: formDataObj.get('phone') as string || formData.phone,
        address: formDataObj.get('address') as string || formData.address,
        website: formDataObj.get('website') as string || formData.website,
        timings: formDataObj.get('timings') as string || formData.timings,
        metaTitle: formDataObj.get('metaTitle') as string || formData.metaTitle,
        metaDescription: formDataObj.get('metaDescription') as string || formData.metaDescription,
        metaKeywords: formDataObj.get('metaKeywords') as string || formData.metaKeywords,
        about: {
          mission: formDataObj.get('mission') as string || formData.about?.mission,
          vision: formDataObj.get('vision') as string || formData.about?.vision,
          whyChooseUs: formData.about?.whyChooseUs || []
        },
        gallery: gallery.length > 0 ? gallery : formData.gallery || [],
        shifts: shifts.length > 0 ? shifts.map((s: any) => ({ ...s, time: s.time || '' })) : formData.shifts || [],
        facilities: facilities.length > 0 ? facilities : formData.facilities || [],
        testimonials: testimonials.length > 0 ? testimonials.map((t: any) => ({ ...t, text: t.text || '' })) : formData.testimonials || [],
        faqs: faqs.length > 0 ? faqs : formData.faqs || []
      };

      if (libraryData?._id) {
        const result = await dispatch(updateLibrary(libraryData._id, updates) as any);
        if (result.error) {
          setSubmitError(result.error);
          toast.error(result.error);
        } else {
          setSubmitSuccess(true);
          toast.success('Library updated successfully!');
          // Also save to Redis via action
          await saveLibraryDetailsAction(undefined, formDataObj);
        }
      } else {
        // If no library in Redux, just save to Redis
        await saveLibraryDetailsAction(undefined, formDataObj);
        setSubmitSuccess(true);
        toast.success('Library details saved successfully!');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to update library';
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/subdomains"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subdomains
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Library Details</h1>
        <p className="text-sm text-gray-500 mt-2">
          Update your library information for <span className="font-medium">{subdomain}.{rootDomain}</span>
        </p>
      </div>

      {/* Preview Link */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Preview your website</p>
                <p className="text-xs text-gray-600">See how your library website looks</p>
              </div>
            </div>
            <a
              href={`${protocol}://${subdomain}.${rootDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Visit Website →
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Form with Tabs */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="subdomain" value={subdomain} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto mb-6 -mx-4 px-4">
            <TabsList className="inline-flex w-auto gap-2 justify-start">
              <TabsTrigger value="basic" className="whitespace-nowrap">
                <Info className="w-4 h-4 mr-2" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="contact" className="whitespace-nowrap">
                <Globe className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="about" className="whitespace-nowrap">
                <Building2 className="w-4 h-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger value="gallery" className="whitespace-nowrap">
                <ImageIcon className="w-4 h-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="facilities" className="whitespace-nowrap">
                <Users className="w-4 h-4 mr-2" />
                Facilities
              </TabsTrigger>
              <TabsTrigger value="shifts" className="whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                Shifts
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="whitespace-nowrap">
                <MessageSquare className="w-4 h-4 mr-2" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="faqs" className="whitespace-nowrap">
                <MessageSquare className="w-4 h-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="seo" className="whitespace-nowrap">
                <Search className="w-4 h-4 mr-2" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="custom-domain" className="whitespace-nowrap">
                <Globe className="w-4 h-4 mr-2" />
                Custom Domain
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Basic Tab */}
          <TabsContent value="basic">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your library</CardDescription>
          </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Library Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., Central Library"
                      defaultValue={formData.name}
                required
              />
            </div>

                  <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell visitors about your library..."
                      defaultValue={formData.description}
              />
            </div>

            <div className="space-y-2">
                    <Label htmlFor="emoji">Emoji Icon</Label>
                    <Input
                      id="emoji"
                      name="emoji"
                      type="text"
                      placeholder="📚"
                      defaultValue={formData.emoji}
                      maxLength={2}
                    />
                    <p className="text-xs text-gray-500">Single emoji to represent your library</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topbar">Topbar Message</Label>
                    <Input
                      id="topbar"
                      name="topbar"
                      type="text"
                      placeholder="📢 Announcement message..."
                      defaultValue={formData.topbar}
                    />
                    <p className="text-xs text-gray-500">Message shown in top bar</p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Logo</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => logoInputRef.current?.click()}
                            className="flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Choose Logo
                          </Button>
              <Input
                id="logo"
                name="logo"
                type="url"
                            placeholder="Or enter logo URL"
                            defaultValue={formData.logo}
                            onChange={(e) => setLogoPreview(e.target.value || null)}
                          />
                        </div>
                      </div>
                      {logoPreview && (
                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            fill
                            className="object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setLogoPreview(null);
                              if (logoInputRef.current) logoInputRef.current.value = '';
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <ContactTab formData={formData} />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <AboutTab formData={formData} />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <GalleryTab initialItems={formData.gallery || []} />
          </TabsContent>

          {/* Facilities Tab */}
          <TabsContent value="facilities">
            <FacilitiesTab initialFacilities={formData.facilities || []} />
          </TabsContent>

          {/* Shifts Tab */}
          <TabsContent value="shifts">
            <ShiftsTab initialShifts={formData.shifts || []} />
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <TestimonialTab initialTestimonials={formData.testimonials || []} />
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs">
            <FaqsTab initialFaqs={formData.faqs || []} />
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <SeoTab formData={formData} />
          </TabsContent>

          {/* Custom Domain Tab */}
          <TabsContent value="custom-domain">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Custom Domain
            </CardTitle>
            <CardDescription>
              Connect your own domain (e.g., tenant.vikrantrathi.com). This will point to your subdomain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customDomain">Custom Domain</Label>
              <Input
                id="customDomain"
                name="customDomain"
                type="text"
                placeholder="tenant.vikrantrathi.com"
                defaultValue={initialData.customDomain}
              />
                  <div className="space-y-2 text-xs text-gray-600 mt-4">
                <p className="font-medium">Steps to setup custom domain:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Enter your custom domain above (without http:// or https://)</li>
                  <li>Save this form</li>
                  <li>Add CNAME record in your DNS provider:
                    <br />
                    <code className="text-xs bg-white px-2 py-1 rounded border mt-1 inline-block">
                      {initialData.customDomain || 'tenant.vikrantrathi.com'} → CNAME → {subdomain}.{rootDomain}
                    </code>
                  </li>
                  <li>If using Vercel, also add this domain in Vercel Dashboard → Settings → Domains</li>
                  <li>Wait 5-60 minutes for DNS propagation</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">
                      Example: If your custom domain is <code>tenant.vikrantrathi.com</code> and subdomain is <code>{subdomain}.{rootDomain}</code>, 
                      add CNAME: <code>tenant.vikrantrathi.com → {subdomain}.{rootDomain}</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>

        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            Library details saved successfully!
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/subdomains">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Details'}
          </Button>
        </div>
      </form>
    </div>
  );
}
