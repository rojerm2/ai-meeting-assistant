package com.orcific.aimeetingassistant.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.orcific.aimeetingassistant.dto.MeetingNotes;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {
    public byte[] generateMeetingPdf(MeetingNotes notes){
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD);
            Font headingFont = new Font(Font.HELVETICA, 16, Font.BOLD);
            document.add(new Paragraph("Meeting Notes", titleFont));

            document.add(Chunk.NEWLINE);

            addSection(document, "Summary", notes.summary(), headingFont);
            addList(document, "Key Decisions", notes.decisions(), headingFont);
            addList(document, "Action Items", notes.actionItems(), headingFont);
            addList(document, "Open Questions", notes.openQuestions(), headingFont);

            document.close();

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private void addSection( Document document, String title, String content, Font headingFont) throws DocumentException {
        document.add(new Paragraph(title, headingFont));
        document.add(new Paragraph(content));
        document.add(Chunk.NEWLINE);
    }

    private void addList( Document document, String title,
                          java.util.List<String> items, Font headingFont) throws DocumentException {

        document.add(new Paragraph(title, headingFont));
        List list = new List(false, 20);

        if(items != null){
            for (String item : items) {
                list.add(new ListItem(item));
            }
        }

        document.add(list);
        document.add(Chunk.NEWLINE);
    }
}
