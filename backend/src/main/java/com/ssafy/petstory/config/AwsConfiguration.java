package com.ssafy.petstory.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.ssafy.petstory.property.AwsS3Property;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
@EnableConfigurationProperties(value = {AwsS3Property.class})
@RequiredArgsConstructor
public class AwsConfiguration {

    private final AwsS3Property awsS3Property;

    @PostConstruct
    public AmazonS3 setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(awsS3Property.getAccessKey(), awsS3Property.getSecretKey());

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsS3Property.getRegion())
                .build();
    }




//    @Bean
//    public TransferManager transferManager() {
//
//        return TransferManagerBuilder.standard()
//                .withS3Client(setS3Client())
//                .withExecutorFactory(() -> createExecutorService(awsS3Property.getTransferThread()))
//                .build();
//    }
//
//    private ThreadPoolExecutor createExecutorService(int threadNumber) {
//        ThreadFactory threadFactory = new ThreadFactory() {
//            private final AtomicInteger threadCount = new AtomicInteger(1);
//
//            public Thread newThread(Runnable r) {
//                Thread thread = new Thread(r);
//                thread.setName("amazon-s3-transfer-manager-worker-" + threadCount.getAndIncrement());
//                return thread;
//            }
//        };
//        return (ThreadPoolExecutor) Executors.newFixedThreadPool(threadNumber, threadFactory);
//    }

}