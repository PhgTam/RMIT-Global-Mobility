# RMIT Global Mobility · Rà soát và tinh chỉnh thiết kế

## Cập nhật ngày 27/11/2026

- Home và Contact có lớp nền campus mới, mây liền khối và vùng chân tòa nhà tiếp xúc với địa hình. Các cảnh mở đầu dùng trục giữa vùng hiển thị. Phần 01, 03 và 04 dùng nền đỏ RMIT với chữ trắng.
- Cảnh 01 mở nền văn phòng hết chiều ngang, chỉnh đường cổ áo, dây và mặt đồng hồ, thêm điểm đỏ ở lịch và đồ dùng. Phong bì và lịch nằm giữa. Cảnh 02 dùng hai lớp bàn tay tách từ storyboard gốc, checklist có số lượng thực tế và ghi chú chung ngoài minh họa.
- Cảnh 03 dùng hình vẽ lại cho cảnh nhân viên xem hồ sơ và bản gốc cho cảnh trao bảng kẹp. Máy quay và tracker vẫn điều khiển theo cuộn. Cảnh 04 dùng các mẫu đơn, thẻ, giấy phép và tư thế cầm giấy tờ từ storyboard gốc. Cảnh 05 thay nền phòng làm việc và bỏ khung trắng, dùng lớp trắng mờ riêng trên ảnh nền.
- Contact dùng FAQ cục bộ Anh–Việt với chín chủ đề, gợi ý, tra cứu, xóa hội thoại và liên kết phần hướng dẫn. README mô tả bộ phân loại AI tùy chọn. Chưa cấu hình hoặc kiểm thử nhà cung cấp thật.
- Đã kiểm tra trên trình duyệt Home và các trạng thái Renewal đại diện ở 1920 × 1080, phần mở đầu ở 1440 × 900, lịch và FAQ ở chiều rộng 390 px. Đã thử luồng bàn phím, đếm checklist, Approved, FAQ EN/VI, fallback và xóa. Kiểm thử mã xác nhận 18 câu chuẩn, ba cách hỏi khác, kiểm tra dữ liệu định danh và giới hạn yêu cầu trên tuyến máy chủ.
- Thư mục đính kèm lần này chỉ có brief. Chưa có mười ảnh lỗi để đối chiếu, PDF Brand Guidelines riêng hay font được cấp quyền. Bàn tay gốc có một số ngón khuất theo góc cầm. Chưa xác nhận giải phẫu từng ngón trong mọi cảnh hoặc độ khớp ở mọi khung chuyển động.

Các mục bên dưới ghi lại đợt rà soát trước đó.

## Phạm vi đã triển khai

| Khu vực | Vấn đề và thay đổi |
|---|---|
| Home | Tách vùng đọc trắng khỏi minh họa bằng lưới 12 cột, dùng chung lề trang và căn tiêu đề, mô tả, nút theo một trục. Campus, mây, cây và địa hình là các lớp riêng. |
| Chọn dịch vụ | Nền xanh RMIT tạo điểm chuyển cảnh. Thẻ Renewal màu trắng, có mũi tên đỏ. Thẻ Repatriation có nhãn Coming soon và chữ xanh đậm dễ đọc. |
| Renewal 01 | Mở đầu và lịch ưu tiên nền trắng. Khung email là điểm nhấn trong cảnh văn phòng. Gợi ý mở nằm ngay dưới phong bì. Ngày minh họa có chú thích bằng HTML và phương án đọc bằng văn bản. |
| Renewal 02 | Nền xanh tạo chiều sâu cho thư mục, trong khi checklist và bản xem trước dùng nền trắng. Mục chọn dùng vạch đỏ, mục đã xem dùng dấu tích trắng trên xanh. |
| Renewal 03 | Thanh quy trình phân biệt bước hiện tại bằng vòng viền đỏ và bước đã qua bằng dấu tích trắng trên xanh. Cảnh tiếp nhận giấy tờ là đoạn dẫn vào bốn bước Application prepared, Submitted, Under review và Approved. Giữ các chuyển cảnh minh họa đang có. |
| Renewal 04 | Nền trắng tách ba mẫu đơn, thẻ và nhân vật. Bảo toàn tỷ lệ giấy tờ và vị trí nhận trong hoạt ảnh. |
| Renewal 05 | Logo xuất hiện nguyên vẹn rồi đi lên khi cảnh chào tạm biệt hiện ra. Hạ khối lời kết, giảm kích thước dòng chữ và chuyển nhân vật sang hai bên để giữ vùng đọc thoáng. |
| Contact | Căn tiêu đề, đoạn giới thiệu và nút đỏ theo cùng một trục. Hộp chat có đầu xanh, vùng đọc trắng, nút gửi đỏ, trạng thái mất kết nối duy nhất và tiêu điểm trả về nút mở khi đóng. |

## Hệ thống thiết kế

- Trắng cho vùng đọc và giấy tờ. Xanh RMIT cho điều hướng, chữ, thao tác phụ và bước đã qua. Đỏ RMIT dùng nguyên màu cho nút chính và điểm nhấn hiện tại.
- Bố cục chuyển từ lưới 12 cột sang cách xếp dọc ở màn hình nhỏ. Logo được đo ở 166 px trên desktop và 86 px ở các khung nhỏ đã kiểm tra.
- Tiêu đề ngắn ưu tiên Museo. Nội dung và câu dài ưu tiên Helvetica Neue LT Pro. Arial là font dự phòng khi máy chưa có font chính thức.
- Campus được chỉnh lại riêng bằng ImageGen từ lớp kiến trúc đã duyệt, với mái nghiêng, lá chắn kính, tháp đỏ, mái che và nền alpha. Các lớp SVG trang trí được đổi màu trực tiếp theo bảng màu, không áp bộ lọc lên toàn bộ minh họa.

## Các tệp đã sửa

- `index.html`, `contact.html`, `renewal.html`.
- `site.css`, `renewal.css`, `site.js`, `renewal.js`, `story.js`, `translations.js`.
- `AGENTS.md`, `SECTION_MAP.md`, `ASSET_MANIFEST.md`.
- Các lớp kiến trúc và cảnh quan đang dùng trong `assets/homepage/`. Nền văn phòng, đồ đạc, phong bì và lịch trong `assets/section-01/`. Vỏ thư mục trong `assets/section-02/`. Nền, thiết bị, bảng kẹp và đồ họa hồ sơ trong `assets/section-03/`. Hành lang trong `assets/section-05/`.

## Kiểm thử thực tế

- Home đã kiểm tra ở 1920 × 1080, 1440 × 900, 1280 × 720, 768 × 1024 và 390 × 844. Không phát hiện cuộn ngang và nút Bắt đầu nằm trong khung nhìn ở cả năm kích thước.
- Trình duyệt đã kiểm tra chuyển từ Home vào Renewal, mở lịch bằng Enter và chuyển tiêu điểm tới lịch, xem đủ bảy danh mục và tự đóng thư mục, đổi ngôn ngữ giữ trạng thái đã xem, cuộn tới Approved rồi quay lại Under review, xem cảnh nhận giấy tờ và lời kết.
- Trên Contact đã thử nhập và gửi bằng Enter, đóng bằng Escape, trả lại tiêu điểm và giữ một thông báo ngoại tuyến sau hai lần gửi. Khung chat ở 390 px không phát hiện cuộn ngang. Các phiên kiểm tra chính không ghi nhận lỗi console.
- Tương phản đã tính bằng độ chói tương đối: trắng trên đỏ 4,58:1, trắng trên xanh 18,62:1, xanh 75% trên trắng 9,30:1, xanh trên tint 30% 9,07:1 và xanh trên tint 50% 4,95:1. Đây là kiểm tra các cặp màu chữ–nền chính theo ngưỡng WCAG AA, không phải chứng nhận toàn bộ website. [WCAG 2.2 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## Phần còn thiếu hoặc cần đối chiếu

- Thư mục đính kèm của brief chỉ có văn bản yêu cầu. Không tìm thấy PDF Brand Guidelines hoặc font web được cấp quyền trong dự án. Bản hướng dẫn công khai được RMIT dẫn từ Agent Digital Toolkit yêu cầu truy cập bổ sung. Các thông số thiết kế lấy theo brief và đối chiếu phần kích thước, khoảng trống logo từ tài liệu công khai. [RMIT Agent Digital Toolkit](https://www.rmit.edu.au/rmit-agent-portal/for-agents/agent-digital-toolkit) · [RMIT Signage Design Standards](https://www.rmit.edu.au/content/dam/rmit/au/en/about/locations-and-facilities/safety-and-security/signage-design-standards.pdf)
- Dùng nguyên PNG logo độ phân giải cao bạn đã cung cấp, gồm biểu tượng đỏ và wordmark đen. Cần tệp master dương bản được RMIT xác nhận để kiểm duyệt chính thức. Canvas campus cấp ảnh raster nên các điểm ảnh ở biên và vùng đổ sắc có sai khác so với mã màu chuẩn. Có thể thay bằng SVG kiến trúc do họa sĩ hoàn thiện nếu cần khớp từng vùng màu.
- Bản nguồn không có cảnh lập kế hoạch đi lại, máy bay hay cảnh cơ quan xét duyệt riêng. Bước Under review dùng cảnh hồ sơ In Progress đã có. Không bổ sung hướng dẫn xuất nhập cảnh khi chưa có nội dung được duyệt.
- Contact dùng FAQ cục bộ và liên kết email mobility@rmit.edu.vn. Bộ phân loại tùy chọn vẫn cần cấu hình.
- Kiểm tra trực quan tập trung vào các trạng thái đại diện và các tương tác chính. Chưa xác minh từng khung chuyển động ở mọi kích thước hoặc đánh giá đầy đủ bằng trình đọc màn hình.

