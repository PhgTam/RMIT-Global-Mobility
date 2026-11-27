(() => {
  if (typeof window !== 'undefined' && window.RmitResetting) return;
  const strings = {
    home: ["Home", "Trang chủ"],
    renewal: ["Renewal", "Gia hạn"],
    repatriation: ["Repatriation", "Hồi hương"],
    contact: ["Contact", "Liên hệ"],
    nav: ["Main navigation", "Điều hướng chính"],
    language: ["Language", "Ngôn ngữ"],
    soon: ["Coming soon", "Sắp ra mắt"],
    go: ["Let's start!", "Bắt đầu!"],
    heroFirst: ["Your journey", "Hành trình của bạn"],
    heroSecond: ["Our support", "Luôn có chúng tôi đồng hành"],
    heroDescription: ["Explore the renewal process at your own pace, with guidance from the Global Mobility team.", "Tìm hiểu quy trình gia hạn theo nhịp độ của bạn, với sự hướng dẫn của đội ngũ Global Mobility."],
    choose: ["How can we help?", "Bạn cần hỗ trợ về thủ tục nào?"],
    chooseHelp: ["Choose a service to get started.", "Chọn một dịch vụ để bắt đầu."],
    exploreRenewal: ["Explore renewal", "Khám phá quy trình gia hạn"],
    renewalSummary: ["Work Permit and Temporary Residence Card", "Giấy phép lao động và Thẻ tạm trú"],
    sections: ["Renewal sections", "Các phần trong quy trình gia hạn"],
    s1: ["Your renewal journey begins", "Bắt đầu hành trình gia hạn"],
    s2: ["Prepare your document", "Chuẩn bị hồ sơ"],
    s3: ["Processing and approval", "Xử lý và phê duyệt"],
    s4: ["Renewal complete", "Hoàn tất gia hạn"],
    s5: ["Closing", "Lời kết"],
    startQ: ["Is your Work Permit or Temporary Residence Card due for renewal?", "Giấy phép lao động hoặc Thẻ tạm trú của bạn sắp đến hạn gia hạn?"],
    startA: ["Don't worry - RMIT's Global Mobility team is here to help.", "Đội ngũ Global Mobility của RMIT luôn sẵn sàng hỗ trợ bạn."],
    scroll: ["Scroll to continue", "Cuộn xuống để tiếp tục"],
    scrollEmail: ["Scroll to the renewal email scene", "Cuộn đến cảnh nhận email gia hạn"],
    sender: ["From: RMIT Mobility Team", "Người gửi: Đội ngũ Global Mobility của RMIT"],
    open: ["Click to open", "Nhấn để mở"],
    openEmail: ["Open your renewal email from the RMIT Mobility Team", "Mở email gia hạn từ đội ngũ Global Mobility của RMIT"],
    textDate: ["Reveal date as text", "Xem ngày gia hạn dưới dạng văn bản"],
    date: ["Renewal date: Thursday, November 12, 2026. Example date only.", "Ngày gia hạn: Thứ Năm, ngày 12 tháng 11 năm 2026. Đây là ngày minh họa."],
    calendarCaption: ["12 November 2026 · Example date", "12 tháng 11 năm 2026 · Ngày minh họa"],
    underReview: ["Under review", "Đang xem xét"],
    calendar: ["November 2026 calendar. Illustrative renewal date: Thursday, November 12.", "Lịch tháng 11 năm 2026. Ngày gia hạn minh họa: Thứ Năm, ngày 12 tháng 11."],
    revisit: ["Return to the renewal email", "Quay lại email gia hạn"],
    documentsIntro: ["Timely documents. Timely renewal.", "Chuẩn bị hồ sơ đúng hạn, gia hạn kịp thời."],
    reviewed: ["Documents reviewed", "Giấy tờ đã xem"],
    viewFolders: ["Click each folder to view its documents.", "Nhấn vào từng mục để xem giấy tờ."],
    organizer: ["Document organizer", "Bìa hồ sơ"],
    skip: ["Continue without reviewing every document", "Tiếp tục mà không cần xem tất cả giấy tờ"],
    reopen: ["Reopen document organizer", "Mở lại bìa hồ sơ"],
    sampleNotice: ["Images are for guidance only. They are not official documents.", "Hình ảnh chỉ để tham khảo và không phải là giấy tờ chính thức."],
    reviewedCount: ["Reviewed", "Đã xem"],
    faqIntro: ["Ask about the renewal guide or choose a question below. Please do not enter passport numbers, TRC numbers, or other personal details.", "Hãy hỏi về hướng dẫn gia hạn hoặc chọn một câu hỏi bên dưới. Vui lòng không nhập số hộ chiếu, số Thẻ tạm trú hoặc thông tin cá nhân khác."],
    faqTyping: ["Looking up the guide…", "Đang tra cứu hướng dẫn…"],
    faqSuggested: ["Suggested questions", "Câu hỏi gợi ý"],
    faqEmpty: ["Enter a question to continue.", "Hãy nhập câu hỏi để tiếp tục."],
    faqLength: ["Keep your question under 600 characters.", "Hãy viết câu hỏi trong tối đa 600 ký tự."],
    faqPrivacy: ["Remove personal identifiers before sending.", "Hãy xóa thông tin định danh cá nhân trước khi gửi."],
    faqFallback: ["The renewal guide does not answer that question. Email Global Mobility at mobility@rmit.edu.vn.", "Hướng dẫn gia hạn chưa có câu trả lời cho câu hỏi này. Hãy gửi email đến mobility@rmit.edu.vn để được Global Mobility hỗ trợ."],
    faqError: ["The FAQ could not load. Try again or contact Global Mobility through your verified RMIT staff channel.", "Không tải được câu hỏi thường gặp. Hãy thử lại hoặc liên hệ đội ngũ Global Mobility qua kênh nội bộ RMIT đã được xác minh."],
    faqClear: ["Clear conversation", "Xóa cuộc trò chuyện"],
    faqYou: ["You", "Bạn"],
    close: ["Close", "Đóng"],
    outside: ["Click outside to close", "Nhấn bên ngoài để đóng"],
    passport: ["Passport", "Hộ chiếu"],
    trc: ["Current TRC", "Thẻ tạm trú hiện tại"],
    photo: ["Passport photo", "Ảnh thẻ"],
    health: ["Health check at a clinic", "Khám sức khỏe tại cơ sở y tế"],
    address: ["Confirmation of current residential address", "Xác nhận địa chỉ cư trú hiện tại"],
    police: ["Police check (if requested)", "Phiếu lý lịch tư pháp (nếu được yêu cầu)"],
    family: ["Family supporting documents (if applicable)", "Giấy tờ chứng minh quan hệ gia đình (nếu áp dụng)"],
    passportDesc: ["Illustration of a passport cover.", "Hình minh họa bìa hộ chiếu."],
    trcDesc: ["Illustration of an issued Temporary Residence Card.", "Hình minh họa Thẻ tạm trú đã được cấp."],
    photoDesc: ["Sample portrait of the employee in this guide.", "Ảnh chân dung minh họa của nhân viên trong hướng dẫn này."],
    healthDesc: ["Illustration of a health check report. It contains no medical information.", "Mẫu minh họa giấy khám sức khỏe, không có thông tin y tế."],
    addressDesc: ["Illustration of an address confirmation document.", "Mẫu minh họa giấy xác nhận địa chỉ cư trú."],
    policeDesc: ["Relevant only if requested.", "Chỉ áp dụng nếu được yêu cầu."],
    familyDesc: ["Examples include birth certificates, marriage certificates, the family book, and other relevant supporting documents.", "Ví dụ gồm giấy khai sinh, giấy chứng nhận kết hôn, sổ hộ khẩu và các giấy tờ liên quan khác."],
    processingIntro: ["Our team prepares your application and manages the process with the relevant authorities.", "Đội ngũ chúng tôi chuẩn bị hồ sơ và làm việc với các cơ quan có thẩm quyền."],
    stages: ["Illustrated renewal application stages", "Các bước xử lý hồ sơ gia hạn minh họa"],
    received: ["Documents received", "Đã nhận giấy tờ"],
    prepared: ["Application prepared", "Đã chuẩn bị hồ sơ"],
    submitted: ["Submitted", "Đã nộp hồ sơ"],
    approved: ["Approved", "Đã được phê duyệt"],
    progress: ["In Progress", "Đang xử lý"],
    illustratedProcess: ["Illustrated process overview", "Quy trình minh họa"],
    completeIntro: ["Once approved, your renewed Work Permit and Temporary Residence Card are ready.", "Sau khi được phê duyệt, Giấy phép lao động và Thẻ tạm trú đã gia hạn của bạn sẽ sẵn sàng."],
    visaForm: ["APPLICATION FORM FOR VISA ISSUANCE, STAY EXTENSION", "ĐƠN ĐỀ NGHỊ CẤP THỊ THỰC, GIA HẠN TẠM TRÚ"],
    trcForm: ["APPLICATION FORM FOR A TEMPORARY RESIDENCE CARD", "ĐƠN ĐỀ NGHỊ CẤP THẺ TẠM TRÚ"],
    wpForm: ["APPLICATION FORM FOR WORK PERMIT", "ĐƠN ĐỀ NGHỊ CẤP GIẤY PHÉP LAO ĐỘNG"],
    trcIssued: ["Temporary Residence Card", "Thẻ tạm trú"],
    wpIssued: ["Work Permit", "Giấy phép lao động"],
    renewed: ["Illustrative renewed documents", "Giấy tờ đã gia hạn (minh họa)"],
    closing: ["Respond promptly to renewal requests, and we'll take care of the rest.", "Hãy phản hồi kịp thời các yêu cầu gia hạn. Chúng tôi sẽ hỗ trợ bạn xử lý phần còn lại."],
    contactUs: ["Contact us", "Liên hệ với chúng tôi"],
    contactDescription: ["Get answers to common questions or contact the Global Mobility team for further assistance.", "Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ đội ngũ Global Mobility để được hỗ trợ thêm."],
    answer: ["Answer more...", "Đặt thêm câu hỏi..."],
    assistant: ["Global Mobility chat", "Trò chuyện với Global Mobility"],
    type: ["Type your question", "Nhập câu hỏi của bạn"],
    send: ["Send", "Gửi"],
    email: ["Contact via email", "Liên hệ qua email"],
    offline: ["The AI assistant is not connected yet. Your message has not been sent to RMIT.", "Trợ lý AI chưa được kết nối. Tin nhắn của bạn chưa được gửi đến RMIT."]
  };
  let vi = false;
  try { vi = localStorage.getItem('rmit.language') === 'vi'; } catch {}
  const get = key => strings[key]?.[Number(vi)] ?? key;
  function apply(root = document) {
    root.querySelectorAll('[data-t]').forEach(el => { el.textContent = get(el.dataset.t); });
    root.querySelectorAll('[data-label]').forEach(el => el.setAttribute('aria-label', get(el.dataset.label)));
    root.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = get(el.dataset.placeholder); });
    root.querySelectorAll('[data-alt]').forEach(el => { el.alt = get(el.dataset.alt); });
    root.querySelectorAll('[data-en-href]').forEach(el =>
      el.setAttribute('href', vi ? el.dataset.viHref : el.dataset.enHref));
  }
  function select(next) {
    vi = next;
    document.documentElement.lang = vi ? 'vi' : 'en';
    document.title = get(document.body.dataset.page) + ' | RMIT Global Mobility';
    try { localStorage.setItem('rmit.language', vi ? 'vi' : 'en'); } catch {}
    apply();
    document.querySelectorAll('[data-language]').forEach(el =>
      el.setAttribute('aria-pressed', String(el.dataset.language === (vi ? 'vi' : 'en'))));
    window.dispatchEvent(new Event('rmit-language'));
  }
  window.RmitText = { get, apply, select, isVietnamese: () => vi };
  document.querySelectorAll('[data-language]').forEach(el =>
    el.addEventListener('click', () => select(el.dataset.language === 'vi')));
  select(vi);
})();

