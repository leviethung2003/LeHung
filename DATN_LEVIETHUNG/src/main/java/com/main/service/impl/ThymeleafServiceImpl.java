package com.main.service.impl;

import com.main.service.ThymeleafService;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import java.util.Map;

@Service
public class ThymeleafServiceImpl implements ThymeleafService {

    private static final String MAIL_TEMPLATE_BASE_NAME = "mail/MailMessage";

    private static final String MAIL_TEMPLATE_PREFIX = "/templates/views/email/";

    private static final String MAIL_TEMPLATE_SUFFIX = ".html";

    private static final TemplateEngine templateEngine;

    static {
        templateEngine = emailTemplateEngine();
    }

    private static TemplateEngine emailTemplateEngine() {
        final SpringTemplateEngine templateEngine = new SpringTemplateEngine();

        templateEngine.setTemplateResolver(htmlTemplateResolver());
        templateEngine.setTemplateEngineMessageSource(emailMessageSource());
        return templateEngine;
    }

    private static ITemplateResolver htmlTemplateResolver() {
        final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix(MAIL_TEMPLATE_PREFIX);
        templateResolver.setSuffix(MAIL_TEMPLATE_SUFFIX);
        templateResolver.setTemplateMode(TemplateMode.HTML);
//        templateResolver.setCharacterEncoding(UTF_8);
        templateResolver.setCacheable(false);

        return templateResolver;
    }

    private static ResourceBundleMessageSource emailMessageSource() {
        final ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename(MAIL_TEMPLATE_BASE_NAME);
        return messageSource;
    }

    @Override
    public String createContent(String template, Map<String, Object> variables) {
        final Context context = new Context();
        context.setVariables(variables);

        return templateEngine.process(template, context);
    }
}
