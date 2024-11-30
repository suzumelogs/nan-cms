import { Box, Card, CardContent, Divider, Grid, Rating, Stack, Typography } from '@mui/material'

const AdminReviews = ({
  reviews,
  isLoading,
}: {
  reviews: Review[] | undefined
  isLoading: boolean
}) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h4" gutterBottom>
        Đánh giá
      </Typography>

      {/* Hiển thị danh sách các đánh giá */}
      <Grid container spacing={3}>
        {isLoading ? (
          <Typography variant="h6">Đang tải dữ liệu...</Typography>
        ) : (
          [
            {
              id: '674731515785879c284a17cd',
              rating: 5,
              comment: 'MEME',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T14:48:47.693Z',
              updatedAt: '2024-11-27T14:48:47.693Z',
            },
            {
              id: '674731975785879c284a17ce',
              rating: 5,
              comment: 'MEME',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T14:49:59.610Z',
              updatedAt: '2024-11-27T14:49:59.610Z',
            },
            {
              id: '6747320e5785879c284a17cf',
              rating: 5,
              comment: 'MEME',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T14:51:58.285Z',
              updatedAt: '2024-11-27T14:51:58.285Z',
            },
            {
              id: '674732225785879c284a17d0',
              rating: 5,
              comment: 'MAY MOC KHONG HOAT DONG',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T14:52:18.059Z',
              updatedAt: '2024-11-27T14:52:18.059Z',
            },
            {
              id: '6747325e5785879c284a17d1',
              rating: 5,
              comment: 'MEME',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T14:53:18.422Z',
              updatedAt: '2024-11-27T14:53:18.422Z',
            },
            {
              id: '6747353d5785879c284a17d3',
              rating: 5,
              comment: 'HEHE',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-27T15:05:33.209Z',
              updatedAt: '2024-11-27T15:05:33.209Z',
            },
            {
              id: '6747e3db319237fcf49273a8',
              rating: 5,
              comment: 'HONG ROI',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-28T03:30:34.875Z',
              updatedAt: '2024-11-28T03:30:34.875Z',
            },
            {
              id: '6749c91a06795fafb0906f95',
              rating: 5,
              comment: 'NGOn',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-29T14:00:57.611Z',
              updatedAt: '2024-11-29T14:00:57.611Z',
            },
            {
              id: '6749cf3d3e6df7c3e3123449',
              rating: 5,
              comment: 'HONG ROI',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-29T14:27:08.532Z',
              updatedAt: '2024-11-29T14:27:08.532Z',
            },
            {
              id: '674b04706add6ee53f240eff',
              rating: 2,
              comment: 'DUỌC DAY',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-30T12:26:24.127Z',
              updatedAt: '2024-11-30T12:26:24.127Z',
            },
            {
              id: '674b059d6add6ee53f240f00',
              rating: 5,
              comment: 'HONG ROI',
              adminResponse: null,
              replyDate: null,
              userId: '67060ab42cedc5097e11d5bf',
              rentalId: '6744226770e9bcea13eeee38',
              createdAt: '2024-11-30T12:31:25.260Z',
              updatedAt: '2024-11-30T12:31:25.260Z',
            },
          ]?.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" color="primary">
                      Đánh giá của người dùng
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Người dùng:</strong> {review.userId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Bình luận:</strong> {review.comment}
                    </Typography>

                    {/* Đánh giá sao */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        <strong>Đánh giá:</strong>
                      </Typography>
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Stack>

                    {/* Trả lời từ admin (nếu có) */}
                    {review.adminResponse ? (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Trả lời từ admin:</strong> {review.adminResponse}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Ngày trả lời:</strong>{' '}
                          {review.replyDate ? formatDate(review.replyDate) : '-'}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Chưa có phản hồi từ admin</strong>
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      <strong>Ngày gửi đánh giá:</strong> {formatDate(review.createdAt)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Stack>
  )
}

// Giả sử rằng Review là một type mô tả cấu trúc của mỗi đánh giá
interface Review {
  id: string
  rating: number
  comment: string
  adminResponse: string | null
  replyDate: string | null
  userId: string
  rentalId: string
  createdAt: string
  updatedAt: string
}

// Giả sử formatDate là một hàm dùng để định dạng ngày
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export { AdminReviews }
