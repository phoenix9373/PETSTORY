package com.ssafy.petstory.property;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

//@Value
@ConstructorBinding // final field에 대해 값을 주입
@ConfigurationProperties(prefix = "aws.s3")
//@RequiredArgsConstructor
@NoArgsConstructor
@Getter
public class AwsS3Property {

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

//    int transferThread;

}
