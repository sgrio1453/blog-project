FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY *.sln ./
COPY BlogProject.Application/*.csproj ./BlogProject.Application/
COPY BlogProject.Domain/*.csproj ./BlogProject.Domain/
COPY BlogProject.Infrastructure/*.csproj ./BlogProject.Infrastructure/
COPY BlogProject.Api/*.csproj ./BlogProject.Api/
RUN dotnet restore BlogProject.Api/*.csproj

COPY . .
RUN dotnet publish BlogProject.Api/*.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "BlogProject.Api.dll"]
