using System.Net;
using System.Text.Json.Serialization;

namespace BlogProject.Application.Result
{
    public class ServiceResult<T>
    {
        public T? Data { get; set; }

        public List<string>? ErrorMessage { get; set; }

        [JsonIgnore]
        public HttpStatusCode StatusCode { get; set; }
        [JsonIgnore]
        public string? UrlAsCreated { get; set; }

        [JsonIgnore]
        public bool IsSuccess => ErrorMessage == null || ErrorMessage.Count == 0;

        public static ServiceResult<T> Success(T? data, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new ServiceResult<T> { Data = data, StatusCode = statusCode };
        }
        public static ServiceResult<T> SuccessAsCreated(T data, string urlAsCreated)
        {
            return new ServiceResult<T>()
            {
                Data = data,
                StatusCode = HttpStatusCode.Created,
                UrlAsCreated = urlAsCreated
            };
        }

        public static ServiceResult<T> Fail(List<string> errorMessage, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            return new ServiceResult<T> { ErrorMessage = errorMessage, StatusCode = statusCode };
        }

        public static ServiceResult<T> Fail(string errorMessage, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            return new ServiceResult<T> { ErrorMessage = [errorMessage], StatusCode = statusCode };
        }
    }

    public class ServiceResult
    {
        public List<string>? ErrorMessage { get; set; }
        [JsonIgnore]
        public HttpStatusCode Status { get; set; }
        [JsonIgnore]
        public bool IsSuccess => ErrorMessage == null || ErrorMessage.Count == 0;
        [JsonIgnore]
        public bool IsFail => !IsSuccess;


        public static ServiceResult Success(HttpStatusCode status = HttpStatusCode.OK)
        {
            return new ServiceResult()
            {
                Status = status,
            };
        }

        public static ServiceResult Fail(List<string> errorMessage, HttpStatusCode status = HttpStatusCode.BadRequest)
        {
            return new ServiceResult()
            {
                ErrorMessage = errorMessage,
                Status = status
            };
        }

        public static ServiceResult Fail(string errorMessage, HttpStatusCode status = HttpStatusCode.BadRequest)
        {
            return new ServiceResult()
            {
                ErrorMessage = [errorMessage],
                Status = status

            };
        }
    }
}
