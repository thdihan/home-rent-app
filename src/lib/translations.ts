export type Lang = 'bn' | 'en';

const translations = {
  // ===== Navbar =====
  nav_home: { bn: 'হোম', en: 'Home' },
  nav_explore: { bn: 'অন্বেষণ', en: 'Explore Home' },
  nav_premium: { bn: 'প্রিমিয়াম', en: 'Premium' },
  nav_dashboard: { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  nav_list_property: { bn: 'বিজ্ঞাপন দিন', en: 'List Your Property' },
  nav_login: { bn: 'লগইন', en: 'Login' },
  nav_logout: { bn: 'লগআউট', en: 'Logout' },
  nav_sign_in: { bn: 'সাইন ইন', en: 'Sign In' },
  nav_account: { bn: 'অ্যাকাউন্ট', en: 'Account' },
  nav_guest: { bn: 'অতিথি ব্যবহারকারী', en: 'Guest User' },

  // ===== Hero =====
  hero_badge: { bn: 'প্রিমিয়াম ভাড়া খুঁজুন', en: 'Discover Premium Rentals' },
  hero_title_1: { bn: 'আপনার পরবর্তী', en: 'Find Your Next' },
  hero_title_2: { bn: 'নিখুঁত বাসা', en: 'Perfect Home' },
  hero_subtitle: {
    bn: 'বাংলাদেশের প্রধান শহরগুলোতে যাচাইকৃত ভাড়া বাসার সবচেয়ে বিশ্বস্ত মার্কেটপ্লেস।',
    en: 'The most trusted marketplace for verified rental properties in major cities across Bangladesh.'
  },

  // ===== HowItWorks =====
  hiw_badge: { bn: 'আমাদের পদ্ধতি', en: 'Our Protocol' },
  hiw_title: { bn: 'কিভাবে কাজ করে', en: 'How It Works' },
  hiw_step1_title: { bn: 'বিজ্ঞাপন দেখুন', en: 'Browse Listings' },
  hiw_step1_desc: {
    bn: 'ঢাকার প্রধান এলাকাগুলোতে প্রিমিয়াম সম্পত্তির তালিকা দেখুন।',
    en: 'Explore a curated list of premium properties across major areas of Dhaka.'
  },
  hiw_step2_title: { bn: 'ক্রেডিট নিন', en: 'Get Credits' },
  hiw_step2_desc: {
    bn: 'আনলক ক্রেডিট পেতে একটি প্ল্যান কিনুন। একজন গুরুতর খোঁজকারী হিসেবে নিজেকে যাচাই করুন।',
    en: 'Purchase a plan to get unlock credits. Verify your intent as a serious seeker.'
  },
  hiw_step3_title: { bn: 'তথ্য আনলক করুন', en: 'Unlock Details' },
  hiw_step3_desc: {
    bn: '১টি ক্রেডিট ব্যবহার করে সঠিক ঠিকানা ও বাড়িওয়ালার ফোন নম্বর দেখুন।',
    en: 'Use 1 credit to instantly reveal the exact address and owner\'s phone number.'
  },
  hiw_step4_title: { bn: 'যোগাযোগ করুন', en: 'Connect & Visit' },
  hiw_step4_desc: {
    bn: 'সরাসরি বাড়িওয়ালাকে কল করুন এবং বাসা দেখার সময় ঠিক করুন।',
    en: 'Call the owner directly to schedule a site visit and finalize your deal.'
  },

  // ===== Home Page =====
  home_editors_choice: { bn: 'সম্পাদকের পছন্দ', en: "Editor's Choice" },
  home_featured: { bn: 'বিশেষ সম্পত্তি', en: 'Featured Properties' },
  home_view_all: { bn: 'সব দেখুন', en: 'View All' },
  home_stat_listings: { bn: 'প্রিমিয়াম তালিকা', en: 'Prime Listings' },
  home_stat_renters: { bn: 'সক্রিয় ভাড়াটিয়া', en: 'Active Renters' },
  home_stat_areas: { bn: 'যাচাইকৃত এলাকা', en: 'Verified Areas' },

  // ===== FilterBar =====
  filter_division: { bn: 'বিভাগ', en: 'Division' },
  filter_district: { bn: 'জেলা', en: 'District' },
  filter_area: { bn: 'এলাকা', en: 'Area' },
  filter_sub_area: { bn: 'উপ-এলাকা', en: 'Sub-Area' },
  filter_search_btn: { bn: 'বাসা খুঁজুন', en: 'Find Flats' },
  filter_select_division: { bn: 'বিভাগ নির্বাচন', en: 'Select Division' },
  filter_select_district: { bn: 'জেলা নির্বাচন', en: 'Select District' },
  filter_select_area: { bn: 'এলাকা নির্বাচন', en: 'Select Area' },
  filter_select_sub_area: { bn: 'উপ-এলাকা নির্বাচন', en: 'Select Sub-Area' },

  // ===== Explore Page =====
  explore_badge: { bn: 'সরাসরি তালিকা', en: 'Live Inventory' },
  explore_title: { bn: 'উপলব্ধ সম্পত্তি', en: 'Available Properties' },
  explore_subtitle: {
    bn: 'বাংলাদেশের প্রধান লোকেশনে এলিট ভাড়ার সুযোগ খুঁজুন।',
    en: 'Find elite rental opportunities in prime locations across Bangladesh.'
  },
  explore_properties_found: { bn: 'টি সম্পত্তি পাওয়া গেছে', en: 'Properties Found' },
  explore_property_found: { bn: 'টি সম্পত্তি পাওয়া গেছে', en: 'Property Found' },
  explore_sort_default: { bn: 'ডিফল্ট', en: 'Default Sorting' },
  explore_sort_price_asc: { bn: 'মূল্য: কম থেকে বেশি', en: 'Price: Low to High' },
  explore_sort_price_desc: { bn: 'মূল্য: বেশি থেকে কম', en: 'Price: High to Low' },
  explore_loading: { bn: 'লোড হচ্ছে...', en: 'Loading...' },

  // ===== HouseCard =====
  card_featured: { bn: 'ফিচার্ড', en: 'Featured' },
  card_unlocked: { bn: 'আনলক', en: 'Unlocked' },

  // ===== Property Details =====
  detail_back: { bn: 'পেছনে', en: 'Back' },
  detail_monthly_rent: { bn: 'মাসিক ভাড়া', en: 'Monthly Rent' },
  detail_image: { bn: 'ছবি', en: 'Image' },
  detail_basic_info: { bn: 'মৌলিক তথ্য', en: 'Basic information' },
  detail_bedroom: { bn: 'বেডরুম', en: 'Bedroom' },
  detail_bathroom: { bn: 'বাথরুম', en: 'Bathroom' },
  detail_balcony: { bn: 'ব্যালকনি', en: 'Balcony' },
  detail_property_id: { bn: 'প্রপার্টি আইডি', en: 'PROPERTY ID' },
  detail_availability: { bn: 'প্রাপ্যতা', en: 'AVAILABILITY STATUS' },
  detail_available: { bn: 'উপলব্ধ', en: 'Available' },
  detail_area: { bn: 'এলাকা', en: 'AREA' },
  detail_category: { bn: 'ক্যাটাগরি', en: 'CATEGORY' },
  detail_category_value: { bn: 'পরিবার / ব্যাচেলর', en: 'Family / Bachelor' },
  detail_property_type: { bn: 'সম্পত্তির ধরন', en: 'PROPERTY TYPE' },
  detail_property_type_value: { bn: 'ফ্ল্যাট / অ্যাপার্টমেন্ট', en: 'Flat / Apartment' },
  detail_description: { bn: 'বর্ণনা', en: 'Description' },
  detail_no_description: { bn: 'বিস্তারিত বর্ণনা দেওয়া হয়নি।', en: 'No detailed description provided.' },
  detail_contact: { bn: 'যোগাযোগের তথ্য ও সঠিক ঠিকানা', en: 'Contact details and Exact address' },
  detail_locked_title: { bn: 'বাড়িওয়ালার যোগাযোগ লক করা আছে', en: 'Owner Contact is Locked' },
  detail_locked_desc: {
    bn: 'সঠিক ঠিকানা ও বাড়িওয়ালার ফোন নম্বর পেতে আনলক করুন।',
    en: "Unlock to get the exact address and owner's phone number."
  },
  detail_unlock_btn: { bn: '১ ক্রেডিট দিয়ে আনলক করুন', en: 'Unlock with 1 Credit' },
  detail_credit_balance: { bn: '১ ক্রেডিট কাটা হবে। বর্তমান ব্যালেন্স:', en: 'Deducts 1 credit. Current balance:' },
  detail_exact_address: { bn: 'সঠিক ঠিকানা', en: 'EXACT ADDRESS' },
  detail_owner_phone: { bn: 'বাড়িওয়ালার ফোন', en: 'OWNER PHONE' },
  detail_call_owner: { bn: 'বাড়িওয়ালাকে কল করুন', en: 'Call Owner' },
  detail_not_found: { bn: 'সম্পত্তি পাওয়া যায়নি', en: 'Property Not Found' },
  detail_not_found_desc: {
    bn: 'আপনি যে তালিকাটি খুঁজছেন সেটি মুছে ফেলা হয়েছে বা বিদ্যমান নেই।',
    en: "The listing you're looking for might have been removed or doesn't exist."
  },
  detail_back_explore: { bn: 'অন্বেষণে ফিরে যান', en: 'Back to Explore' },

  // ===== Auth Modal =====
  auth_welcome: { bn: 'স্বাগতম', en: 'Welcome Back' },
  auth_create: { bn: 'অ্যাকাউন্ট তৈরি', en: 'Create Account' },
  auth_login_desc: { bn: 'চালিয়ে যেতে আপনার তথ্য দিন', en: 'Enter your credentials to continue' },
  auth_register_desc: { bn: 'আজই এলিট মার্কেটপ্লেসে যোগ দিন', en: 'Join the elite marketplace today' },
  auth_email: { bn: 'ইমেইল ঠিকানা', en: 'Email Address' },
  auth_password: { bn: 'পাসওয়ার্ড', en: 'Password' },
  auth_login_btn: { bn: 'লগইন', en: 'Login' },
  auth_join_btn: { bn: 'যোগ দিন', en: 'Join Now' },
  auth_processing: { bn: 'প্রক্রিয়াকরণ...', en: 'Processing...' },
  auth_demo_login: { bn: 'ডেমো গেস্ট হিসেবে লগইন', en: 'Login as Demo Guest' },
  auth_dev_bypass: { bn: 'ডেভেলপমেন্ট বাইপাস', en: 'Development Bypass' },
  auth_no_account: { bn: 'অ্যাকাউন্ট নেই?', en: "Don't have an account?" },
  auth_already_member: { bn: 'ইতিমধ্যে সদস্য?', en: 'Already member?' },
  auth_register_now: { bn: 'এখনই নিবন্ধন করুন', en: 'Register Now' },
  auth_login_here: { bn: 'এখানে লগইন করুন', en: 'Login Here' },

  // ===== Pricing =====
  pricing_title: { bn: 'প্রিমিয়াম অ্যাক্সেস আনলক করুন', en: 'Unlock Premium Access' },
  pricing_subtitle: {
    bn: 'মালিকের যোগাযোগ ও সঠিক ঠিকানা দেখতে একটি ক্রেডিট প্ল্যান বেছে নিন।',
    en: 'Choose a credit plan to instantly reveal owner contacts and exact addresses.'
  },
  pricing_plan_a_label: { bn: 'স্টার্টার', en: 'Starter' },
  pricing_plan_a_name: { bn: 'প্ল্যান এ', en: 'Plan A' },
  pricing_plan_a_credits: { bn: '১০ আনলক ক্রেডিট', en: '10 Unlock Credits' },
  pricing_plan_a_feat1: { bn: 'মালিকের ফোন নম্বর দেখুন', en: 'Access owner phone numbers' },
  pricing_plan_a_feat2: { bn: 'সঠিক ম্যাপ লোকেশন দেখুন', en: 'Reveal exact map locations' },
  pricing_buy_credits: { bn: 'ক্রেডিট কিনুন', en: 'Buy Credits' },
  pricing_plan_b_label: { bn: 'স্ট্যান্ডার্ড', en: 'Standard' },
  pricing_plan_b_name: { bn: 'প্ল্যান বি', en: 'Plan B' },
  pricing_plan_b_credits: { bn: '২৫ আনলক ক্রেডিট', en: '25 Unlock Credits' },
  pricing_best_value: { bn: 'সেরা মূল্য', en: 'Best Value' },
  pricing_plan_b_feat1: { bn: 'প্ল্যান এ-র সবকিছু', en: 'Everything in Plan A' },
  pricing_plan_b_feat2: { bn: '২.৫ গুণ বেশি ক্রেডিট', en: '2.5x more credits' },
  pricing_plan_b_feat3: { bn: 'ভ্যালু ফর মানি', en: 'Great value for money' },
  pricing_get_pro: { bn: 'স্ট্যান্ডার্ড নিন', en: 'Get Standard' },
  pricing_plan_c_label: { bn: 'প্রো', en: 'Pro' },
  pricing_plan_c_name: { bn: 'প্ল্যান সি', en: 'Plan C' },
  pricing_plan_c_credits: { bn: '৭০ আনলক ক্রেডিট', en: '70 Unlock Credits' },
  pricing_plan_c_feat1: { bn: 'প্ল্যান বি-র সবকিছু', en: 'Everything in Plan B' },
  pricing_plan_c_feat2: { bn: '৭ গুণ বেশি ক্রেডিট', en: '7x more credits' },
  pricing_plan_c_feat3: { bn: 'প্রিমিয়াম সাপোর্ট', en: 'Premium support' },
  pricing_get_ultimate: { bn: 'প্রো অ্যাক্সেস নিন', en: 'Get Pro Access' },

  // ===== Checkout =====
  checkout_title: { bn: 'চেকআউট', en: 'Checkout' },
  checkout_subtitle: { bn: '-এর জন্য পেমেন্ট সম্পন্ন করুন', en: 'Complete your purchase for' },
  checkout_total: { bn: 'মোট পরিশোধযোগ্য', en: 'Total Amount to Pay' },
  checkout_for_credits: { bn: 'ক্রেডিটের জন্য', en: 'For' },
  checkout_credits_label: { bn: 'ক্রেডিট', en: 'Credits' },
  checkout_step1: { bn: 'বিকাশে পেমেন্ট করুন', en: 'Make Payment via bKash' },
  checkout_step1_1: { bn: '১. আপনার বিকাশ অ্যাপ খুলুন এবং', en: '1. Open your bKash App and select' },
  checkout_send_money: { bn: 'সেন্ড মানি', en: 'Send Money' },
  checkout_step1_2: { bn: '২. আমাদের পার্সোনাল নম্বর দিন:', en: '2. Enter our Personal Number:' },
  checkout_step1_3_prefix: { bn: '৩. সঠিক পরিমাণ দিন:', en: '3. Enter the exact amount:' },
  checkout_step1_4: { bn: '৪. লেনদেন নিশ্চিত করুন এবং', en: '4. Confirm the transaction and save the' },
  checkout_trxid: { bn: 'ট্রান্সজেকশন আইডি (TrxID)', en: 'Transaction ID (TrxID)' },
  checkout_step2: { bn: 'যাচাইয়ের জন্য তথ্য জমা দিন', en: 'Submit Details for Verification' },
  checkout_bkash_number: { bn: 'আপনার বিকাশ নম্বর', en: 'Your bKash Number' },
  checkout_submit_btn: { bn: 'অনুমোদনের জন্য পেমেন্ট জমা দিন', en: 'Submit Payment for Approval' },
  checkout_submitting: { bn: 'জমা দেওয়া হচ্ছে...', en: 'Submitting...' },
  checkout_note: {
    bn: '* আমাদের টিম পেমেন্ট যাচাই করার পর আপনার ক্রেডিট যোগ হবে (সাধারণত ১০-১৫ মিনিটের মধ্যে)।',
    en: '* Your credits will be added to your account once our team verifies the payment (usually within 10-15 minutes).'
  },

  // ===== Footer =====
  footer_copyright: { bn: '© ২০২৬ বাসালাগবে বাংলাদেশ। এলিট প্রপার্টি সলিউশনস।', en: '© 2026 BashaLagbe Bangladesh. Elite Property Solutions.' },
  footer_privacy: { bn: 'গোপনীয়তা', en: 'Privacy' },
  footer_terms: { bn: 'শর্তাবলী', en: 'Terms' },
  footer_contact: { bn: 'যোগাযোগ', en: 'Contact' },

  // ===== List Property =====
  list_badge: { bn: 'মালিক পোর্টাল', en: 'Owner Portal' },
  list_title: { bn: 'আপনার সম্পত্তি তালিকাভুক্ত করুন', en: 'List Your Property' },
  list_edit_title: { bn: 'আপনার সম্পত্তি সম্পাদনা করুন', en: 'Edit Your Property' },
  list_subtitle: {
    bn: 'সম্ভাব্য ভাড়াটিয়াদের কাছে আপনার বাসা দেখানোর জন্য নিচের তথ্য পূরণ করুন।',
    en: 'Fill in the details below to showcase your home to potential renters.'
  },
  list_edit_subtitle: { bn: 'নিচের তথ্য আপডেট করুন।', en: 'Update the details below.' },
  list_property_title: { bn: 'সম্পত্তির শিরোনাম', en: 'Property Title' },
  list_title_placeholder: { bn: 'যেমন: গুলশানে বিলাসবহুল ৩ বেডরুম', en: 'e.g. Luxury 3BHK in Gulshan' },
  list_address: { bn: 'সঠিক ঠিকানা (গোপনীয়)', en: 'Exact Address (Private)' },
  list_address_placeholder: { bn: 'বাড়ি, রোড, ব্লক...', en: 'House, Road, Block...' },
  list_address_note: { bn: '* আনলক না করা পর্যন্ত এটি লুকানো থাকবে', en: '* This will be hidden until unlocked' },
  list_phone: { bn: 'যোগাযোগ নম্বর (গোপনীয়)', en: 'Contact Number (Private)' },
  list_rent: { bn: 'মাসিক ভাড়া (৳)', en: 'Monthly Rent (৳)' },
  list_beds: { bn: 'বেড', en: 'Beds' },
  list_baths: { bn: 'বাথ', en: 'Baths' },
  list_balcony: { bn: 'ব্যালকনি', en: 'Balcony' },
  list_lift: { bn: 'লিফট', en: 'Lift' },
  list_parking: { bn: 'পার্কিং', en: 'Parking' },
  list_gas: { bn: 'গ্যাস', en: 'Gas' },
  list_gas_prepaid: { bn: 'প্রিপেইড', en: 'Prepaid' },
  list_gas_postpaid: { bn: 'পোস্টপেইড', en: 'Postpaid' },
  list_gas_cylinder: { bn: 'সিলিন্ডার', en: 'Cylinder' },
  list_yes: { bn: 'হ্যাঁ', en: 'Yes' },
  list_no: { bn: 'না', en: 'No' },
  list_description: { bn: 'বিস্তারিত বর্ণনা', en: 'Detailed Description' },
  list_desc_placeholder: {
    bn: 'আপনার সম্পত্তি, কাছের ল্যান্ডমার্ক, সুবিধা, নিয়ম ইত্যাদি বর্ণনা করুন...',
    en: 'Describe your property, nearby landmarks, facilities, rules, and anything else renters should know...'
  },
  list_submit_btn: { bn: 'এখনই তালিকাভুক্ত করুন', en: 'List Property Now' },
  list_upload_title: { bn: 'সম্পত্তির ছবি আপলোড করুন', en: 'Upload Property Images' },
  list_add_more: { bn: 'আরো যোগ করুন', en: 'Add More' },
  list_terms: {
    bn: 'তালিকাভুক্ত করে, আপনি আমাদের সম্পত্তি যাচাইয়ের শর্তাবলী মেনে নিচ্ছেন।',
    en: 'By clicking list, you agree to our terms of property verification.'
  },

  // ===== Toast Messages =====
  toast_welcome: { bn: 'বাসালাগবেতে স্বাগতম!', en: 'Welcome to BashaLagbe!' },
  toast_logout: { bn: 'সফলভাবে লগআউট হয়েছে', en: 'Logged out successfully' },
  toast_unlock_success: { bn: 'সম্পত্তি সফলভাবে আনলক হয়েছে!', en: 'Property unlocked successfully!' },
  toast_unlock_fail: { bn: 'আনলক ব্যর্থ। আবার চেষ্টা করুন।', en: 'Unlock failed. Try again.' },
  toast_insufficient_credits: { bn: 'অপর্যাপ্ত ক্রেডিট। অনুগ্রহ করে আপগ্রেড করুন।', en: 'Insufficient credits. Please upgrade.' },
  toast_property_listed: { bn: 'সম্পত্তি সফলভাবে তালিকাভুক্ত হয়েছে!', en: 'Property listed successfully!' },
  toast_property_updated: { bn: 'সম্পত্তি সফলভাবে আপডেট হয়েছে!', en: 'Property updated successfully!' },
  toast_property_failed: { bn: 'সম্পত্তি তালিকাভুক্ত করা যায়নি', en: 'Failed to list property' },
  toast_fetch_fail: { bn: 'সম্পত্তি লোড করা যায়নি', en: 'Failed to fetch properties' },
  toast_payment_submitted: { bn: 'পেমেন্ট অনুমোদনের জন্য জমা দেওয়া হয়েছে!', en: 'Payment submitted for approval!' },
  toast_payment_failed: { bn: 'পেমেন্ট জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।', en: 'Failed to submit payment. Please try again.' },
  toast_fill_fields: { bn: 'অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন', en: 'Please fill in all fields' },
  toast_copied: { bn: 'নম্বর কপি হয়েছে', en: 'Number copied to clipboard' },
  toast_load_fail: { bn: 'সম্পত্তির বিবরণ লোড করতে ব্যর্থ', en: 'Failed to load property details' },
  toast_error: { bn: 'একটি সমস্যা হয়েছে', en: 'An error occurred' },

  // ===== Auth Modal Message =====
  auth_modal_list_prompt: {
    bn: 'সম্পত্তি তালিকাভুক্ত করতে অনুগ্রহ করে প্রথমে লগইন বা নিবন্ধন করুন।',
    en: 'Please login or register yourself first to list a property.'
  },

  // ===== Select generic =====
  select: { bn: 'নির্বাচন করুন', en: 'Select' },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(lang: Lang, key: TranslationKey): string {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}

export default translations;
